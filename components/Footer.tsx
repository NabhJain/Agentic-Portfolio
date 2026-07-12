import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[12px] text-ash">
          © {new Date().getFullYear()} {profile.name}.
        </p>
        <p className="font-mono text-[12px] text-ash">
          Designed &amp; engineered solo.
        </p>
      </div>
    </footer>
  );
}
