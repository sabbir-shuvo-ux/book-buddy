import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const books: Prisma.BookCreateInput[] = [
  {
    author: "Chinua Achebe",
    country: "Nigeria",
    imageLink:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "English",
    pages: 209,
    title: "Things Fall Apart",
    year: 1958,
  },
  {
    author: "Hans Christian Andersen",
    country: "Denmark",
    imageLink:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Danish",

    pages: 784,
    title: "Fairy tales",
    year: 1836,
  },
  {
    author: "Dante Alighieri",
    country: "Italy",
    imageLink:
      "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Italian",

    pages: 928,
    title: "The Divine Comedy",
    year: 1315,
  },
  {
    country: "Sumer and Akkadian Empire",
    imageLink:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1429&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Akkadian",

    pages: 160,
    title: "The Epic Of Gilgamesh",
    year: 1700,
  },
  {
    country: "Achaemenid Empire",
    imageLink:
      "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?q=80&w=1370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Hebrew",

    pages: 176,
    title: "The Book Of Job",
    year: 600,
  },
  {
    country: "Iran",
    imageLink:
      "https://images.unsplash.com/photo-1562232573-0305012a8818?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Arabic",
    pages: 288,
    title: "One Thousand and One Nights",
    year: 1200,
  },
  {
    country: "Iceland",
    imageLink:
      "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "Old Norse",

    pages: 384,
    title: "Nj\u00e1l's Saga",
    year: 1350,
  },
  {
    author: "Jane Austen",
    country: "United Kingdom",
    imageLink:
      "https://images.unsplash.com/photo-1467951591042-f388365db261?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "English",
    pages: 226,
    title: "Pride and Prejudice",
    year: 1813,
  },
  {
    author: "Honor\u00e9 de Balzac",
    country: "France",
    imageLink:
      "https://images.unsplash.com/photo-1554672053-c4205442a9fb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "French",
    pages: 443,
    title: "Le P\u00e8re Goriot",
    year: 1835,
  },
  {
    author: "Samuel Beckett",
    country: "Republic of Ireland",
    imageLink:
      "https://images.unsplash.com/photo-1599893242842-1b723407f8c9?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    language: "French, English",
    pages: 256,
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    year: 1952,
  },
];

async function main() {
  console.log("Start seeding...");

  for (const book of books) {
    await prisma.book.create({
      data: book,
    });
    console.log(book.title + " Seed Success");
  }
  console.log("Books seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
