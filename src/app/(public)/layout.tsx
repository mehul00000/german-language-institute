import { Nav } from "@/components/public/nav";
import { Footer } from "@/components/public/footer";
import { BookBar } from "@/components/public/book-bar";
import { Reveal } from "@/components/public/reveal";

const SLOT_SCRIPT = `window.hallmarkSlots = (m) => { for (const [k, v] of Object.entries(m)) { const s = document.querySelector('[data-slot="' + k + '"]'); if (!s) continue; const im = new Image(); im.src = typeof v === 'string' ? v : v.src; im.alt = (typeof v === 'object' && v.alt) || s.dataset.alt || ''; s.querySelectorAll(':scope > img').forEach((o) => o.remove()); s.prepend(im); } };
document.querySelectorAll('[data-slot] img').forEach((i) => { if (i.complete && !i.naturalWidth) i.remove(); else i.addEventListener('error', () => i.remove(), { once: true }); });`;

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <BookBar />
      <Reveal />
      <script dangerouslySetInnerHTML={{ __html: SLOT_SCRIPT }} />
    </>
  );
}
