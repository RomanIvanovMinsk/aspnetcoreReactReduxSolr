using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreTest.Services;
using AspNetCoreTest.Services.Interfaces;
using DAL.Core;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreTest
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
	        services.AddDbContext<MainContext>(options =>
		        options.UseSqlServer(@"Server=.\;Database=Challenge3;Trusted_Connection=True;MultipleActiveResultSets=true", b => b.MigrationsAssembly("DAL.Core")));
			services.AddMvc();

			services.AddTransient<IFillDbService, FillDbService>();
	        services.AddTransient<IBlogPostService, BlogPostsService>();
		}

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                //{
                //    HotModuleReplacement = true,
                //    ReactHotModuleReplacement = true
                //});
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });

	        using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
	        {
		        var context = serviceScope.ServiceProvider.GetRequiredService<MainContext>();
				context.Database.Migrate();
		        context.Database.EnsureCreated();
	        }
		}
    }
}
