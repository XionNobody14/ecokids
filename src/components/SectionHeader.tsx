interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="cabeza">
      <img
        src="/assets/pngwing.com.png"
        alt=""
        aria-hidden="true"
        width={200}
        height={30}
        className="divider-ornament"
      />
      <h2>{title}</h2>
      <img
        src="/assets/pngwing.com.png"
        alt=""
        aria-hidden="true"
        width={200}
        height={30}
        className="divider-ornament"
      />
    </div>
  );
}
