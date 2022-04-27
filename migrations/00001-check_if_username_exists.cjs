exports.up = async (client) => {
	await client`
    create or replace function public.username_exists()
      returns trigger 
      language plpgsql 
      security definer set search_path = public
      as
    $$
    begin
      if exists(select 1 from profiles where username = new.raw_user_meta_data->>'username' limit 1) then
          raise exception 'username already exists';
      end if;
      return new;
    end
    $$;
  `
  await client`
    /* Trigger itself */
    create trigger on_signup_check_username
      before insert on auth.users
      for each row execute procedure public.username_exists();
  `
}

exports.down = async (client) => {
  // You will need to elevate the user in order for the down to run on the auth.users table
  // just run the code commented below inside of the supabase dashboard SQL editor
  // await client`alter user postgres with superuser;`
	await client`drop trigger if exists on_signup_check_username on auth.users;`
	await client`drop function if exists public.username_exists();`
  // await client`alter user postgres with nosuperuser;`
}
