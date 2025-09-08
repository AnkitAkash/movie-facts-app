import Image from "next/image";

export function UserCard({ name, email, image }: { name: string | null; email: string; image: string | null; }) {
  return (
    <div className="card">
      <div className="row">
        {image && (
          <Image className="avatar" src={image} alt={name ?? email} width={72} height={72} />
        )}
        <div>
          <div><span className="label">Name:</span> {name ?? "(no name)"}</div>
          <div><span className="label">Email:</span> {email}</div>
        </div>
      </div>
    </div>
  );
}
