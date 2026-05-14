export function LogoutButton() {
  return (
    <form action="/api/admin/logout" method="post">
      <button className="w-full rounded-lg border border-white/15 px-3 py-2 text-left text-sm font-medium text-white transition hover:bg-white/10" type="submit">
        Sign out
      </button>
    </form>
  );
}
