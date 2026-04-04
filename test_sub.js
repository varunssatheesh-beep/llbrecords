const url = 'https://iokqorrklniunxomjwai.supabase.co/rest/v1/user_progress';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlva3FvcnJrbG5pdW54b21qd2FpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzMTcwOTgsImV4cCI6MjA5MDg5MzA5OH0.pgPDafpAHZ2bHD1c0CeptrkORnn3QI1ycTz8qpo85RQ';

async function run() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify({ username: "test1", checklist: { m1: true } })
  });
  console.log("POST res:", res.status, await res.text());

  const res2 = await fetch(url + '?username=eq.test1', {
    headers: { apikey: key, Authorization: `Bearer ${key}` }
  });
  console.log("GET res:", res2.status, await res2.text());
}
run();
