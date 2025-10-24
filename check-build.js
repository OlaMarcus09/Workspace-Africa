const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build requirements...\n');

// Check critical files
const criticalFiles = [
  'lib/supabase.js',
  'context/AuthContext.js', 
  'components/Navigation.js',
  'app/layout.js',
  '.env.local'
];

let allFilesExist = true;

criticalFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

// Check environment variables
console.log('\n📋 Environment Variables:');
const env = require('dotenv').config({ path: '.env.local' }).parsed || {};
console.log('NEXT_PUBLIC_SUPABASE_URL:', env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');

if (allFilesExist && env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('\n🎉 All build requirements are met!');
  console.log('You should be able to run: npm run build');
} else {
  console.log('\n❌ Some requirements are missing. Please fix the issues above.');
}
