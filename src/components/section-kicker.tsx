type SectionIcon = "career" | "achievements" | "projects" | "expertise" | "education";

const iconPaths: Record<SectionIcon, string[]> = {
  career: ["M3 8h18v13H3z", "M8 8V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3M3 13h18M10 13v2h4v-2"],
  achievements: [
    "M7 4h10v4a5 5 0 0 1-10 0zM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4",
  ],
  projects: ["M4 5h6l2 2h8v12H4z", "M4 9h16M8 13h8M8 16h5"],
  expertise: ["m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"],
  education: ["m2 9 10-5 10 5-10 5zM6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6"],
};

export function SectionKicker({ icon, children }: { icon: SectionIcon; children: string }) {
  return (
    <span className="section-kicker">
      <svg className="section-kicker-icon" viewBox="0 0 24 24" aria-hidden="true">
        {iconPaths[icon].map((path) => (
          <path d={path} key={path} />
        ))}
      </svg>
      {children}
    </span>
  );
}
