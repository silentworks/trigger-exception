exports.up = async (client) => {
	await client`
    create table public.profiles (
      id uuid references auth.users not null,
      username varchar not null,
      full_name varchar null,
      created_at timestamptz default now() not null,
      updated_at timestamptz,
    
      primary key (id),
      unique (username)
    )
  `
  await client`alter table public.profiles enable row level security;`
}

exports.down = async (client) => {
  await client`alter table public.profiles disable row level security;`
	await client`drop table if exists public.profiles`
}
