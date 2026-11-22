require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const connectDB = require('../config/db');

const UsersModel = require('../app/models/users');
const ProjectsModel = require('../app/models/projects');
const ServicesModel = require('../app/models/services');
const ReferencesModel = require('../app/models/references');

const users = [
  {
    firstname: 'Pedro',
    lastname: 'Bilhalva',
    email: 'pedro@example.com',
    password: 'password123',
    created: new Date('2026-01-10'),
    updated: new Date('2026-01-10'),
  },
];

const projects = [
  {
    name: 'Minha Feira',
    role: 'Frontend',
    completionDate: new Date('2025-11-01'),
    stack: ['React Native', 'Expo', 'NativeWind', 'TypeScript'],
    image: '/projects/minha-feira.png',
    repoUrl:
      'https://gitlab.com/senac-projetos-de-desenvolvimento/2025-debora-pedro-diego/minha-feira-frontend',
    hasEnglishDescription: false,
    description:
      'A mobile app for discovering and managing street markets (feiras), with login, favorites, reviews, an interactive map, and paginated search. Built with Expo for the Senac 2025 team project, where I acted as frontend developer and drove it to a stable build.',
  },
  {
    name: 'Tormenta 20 Sheet Builder',
    role: 'Frontend',
    completionDate: new Date('2024-01-01'),
    stack: ['React', 'Chakra UI', 'TypeScript', 'Vercel Postgres'],
    image: '/projects/t20-sheet.png',
    repoUrl: 'https://github.com/Bilhalv/T20-Sheet',
    hasEnglishDescription: true,
    description:
      'Interactive character sheet builder for the Brazilian TTRPG Tormenta 20 - assemble stats, skills, and inventory, then export to PDF. A cross-discipline project (DB, web, OOP, mobile) built with React, where I developed the frontend.',
  },
  {
    name: 'Rick and Morty API Test',
    role: 'Main Developer',
    completionDate: new Date('2024-09-01'),
    stack: ['React Native', 'Expo', 'REST API'],
    image: '/projects/rick-morty.png',
    repoUrl: 'https://github.com/Bilhalv/Rick-and-morty-API-Test',
    hasEnglishDescription: true,
    description:
      'A compact Expo app that consumes the Rick and Morty API, with a searchable character list, add-to-list, and character detail pages. A focused exercise in React Native navigation and API integration.',
  },
];

const services = [
  {
    title: 'Web Development',
    description:
      'Responsive, accessible interfaces built with React.js and Next.js, styled with TailwindCSS and backed by well-structured, reusable components.',
    tags: ['React.js', 'Next.js', 'TailwindCSS', 'TypeScript'],
  },
  {
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps using React Native and Expo, delivering smooth, native-feeling experiences from a single codebase.',
    tags: ['React Native', 'Expo', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'UI/UX Implementation',
    description:
      'Translation of complex Figma designs into clean, modular, and production-ready UI components that match the original vision pixel by pixel.',
    tags: ['Figma', 'HTML5', 'CSS3', 'Component Architecture'],
  },
  {
    title: 'API Integration & General Programming',
    description:
      'RESTful API integration, maintainable code with Jest testing, and general programming skills for algorithms and a variety of problem domains.',
    tags: ['REST API', 'MVC', 'Jest', 'Python'],
  },
];

const references = [
  {
    name: 'Ana Vargas',
    testimonial:
      'Pedro consistently delivered thoughtful, well-structured projects and always went the extra mile to polish the user experience.',
    position: 'Girlfriend',
    company: 'Personal Life',
  },
  {
    name: 'Débora Carvalho',
    testimonial:
      'A great colleague, always willing to help and committed to delivering excellent quality work. It was a pleasure to be part of the same group and share professional experiences.',
    position: 'Student',
    company: 'Senac',
  },
  {
    name: 'Diego Nachtigall Morales',
    testimonial:
      'A great front-end developer, has vast knowledge and is always looking to improve.',
    position: 'Student',
    company: 'Senac',
  },
];

async function upsertMany(Model, items, keyFields, label) {
  let created = 0;
  let updated = 0;

  for (const item of items) {
    const filter = {};
    for (const key of keyFields) filter[key] = item[key];

    const existing = await Model.findOne(filter);
    if (existing) {
      await Model.updateOne({ _id: existing._id }, { $set: item }, { runValidators: true });
      updated += 1;
    } else {
      await Model.create(item);
      created += 1;
    }
  }

  console.log(`${label}: ${created} created, ${updated} updated`);
}

async function seed() {
  try {
    await connectDB();

    await upsertMany(UsersModel, users, ['email'], 'Users');
    await upsertMany(ProjectsModel, projects, ['name'], 'Projects');
    await upsertMany(ServicesModel, services, ['title'], 'Services');
    await upsertMany(ReferencesModel, references, ['name', 'company'], 'References');

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
}

seed();
