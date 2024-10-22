/** @jsxImportSource @emotion/react */

export default function Button({
  label,
  onClick,
  deleted,
}: {
  label: string;
  onClick: () => {};
  deleted?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      css={{
        padding: "8px 12px",
        border: "none",
        color: "#ffffff",
        backgroundColor: deleted ? "red " : "#33c3ff",
        borderRadius: "4px",
        "&:hover": {
          color: "black",
        },
      }}
    >
      {label}
    </button>
  );
}
