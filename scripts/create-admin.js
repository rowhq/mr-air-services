// Script para crear usuario admin
// Ejecutar: node scripts/create-admin.js

const bcrypt = require('bcryptjs');

const password = 'Admin123!';
const hash = bcrypt.hashSync(password, 10);

console.log('\n===========================================');
console.log('SQL para crear admin en Neon:');
console.log('===========================================\n');

console.log(`INSERT INTO users (email, password_hash, name, role) VALUES (
  'admin@mrairservices.com',
  '${hash}',
  'Admin',
  'admin'
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash;`);

console.log('\n===========================================');
console.log('Credenciales:');
console.log('Email: admin@mrairservices.com');
console.log('Password: Admin123!');
console.log('===========================================\n');
