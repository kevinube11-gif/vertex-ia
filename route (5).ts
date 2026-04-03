@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'DM Sans', system-ui, sans-serif;
  background: #0A0704;
  color: #FAF8F4;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
}

/* Colores Vertex */
:root {
  --gold: #C9A34A;
  --dark: #0D0A07;
  --surface: #140D05;
  --text: #FAF8F4;
  --text-secondary: #BDB09A;
}

.btn-primary {
  @apply bg-[#C9A34A] text-[#0D0A07] px-4 py-2 rounded font-semibold hover:bg-[#E8C96A] transition;
}

.btn-secondary {
  @apply bg-[#1C1409] text-[#C9A34A] px-4 py-2 rounded border border-[#C9A34A] hover:bg-[#2B1B12] transition;
}

.card {
  @apply bg-[#140D05] border border-[#2B1B12] rounded-lg p-6;
}

.input-field {
  @apply bg-[#1C1409] text-[#FAF8F4] px-4 py-2 rounded border border-[#2B1B12] focus:border-[#C9A34A] outline-none transition;
}

.badge {
  @apply inline-block px-3 py-1 rounded-full text-sm;
}

.badge-success {
  @apply bg-green-900 text-green-100;
}

.badge-warning {
  @apply bg-yellow-900 text-yellow-100;
}

.badge-error {
  @apply bg-red-900 text-red-100;
}

.table {
  @apply w-full border-collapse;
}

.table th {
  @apply bg-[#1C1409] text-[#C9A34A] px-4 py-2 text-left border-b border-[#2B1B12];
}

.table td {
  @apply px-4 py-2 border-b border-[#2B1B12];
}

.table tr:hover {
  @apply bg-[#1C1409];
}
