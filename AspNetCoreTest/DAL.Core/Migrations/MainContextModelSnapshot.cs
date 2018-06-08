﻿// <auto-generated />

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace DAL.Core.Migrations
{
    [DbContext(typeof(MainContext))]
    partial class MainContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("DAL.Core.Models.Author", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("FirstMidName");

                    b.Property<string>("LastName");

                    b.HasKey("ID");

                    b.ToTable("Author");
                });

            modelBuilder.Entity("DAL.Core.Models.Post", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AuthorID");

                    b.Property<DateTime>("Created");

                    b.Property<string>("Text");

                    b.Property<string>("Title");

                    b.Property<DateTime>("Updated");

                    b.HasKey("ID");

                    b.HasIndex("AuthorID");

                    b.ToTable("Post");
                });

            modelBuilder.Entity("DAL.Core.Models.Post", b =>
                {
                    b.HasOne("DAL.Core.Models.Author", "Author")
                        .WithMany("Posts")
                        .HasForeignKey("AuthorID");
                });
#pragma warning restore 612, 618
        }
    }
}
