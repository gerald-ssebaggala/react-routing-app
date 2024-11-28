import { Link } from "react-router-dom";
import { Company } from "../dataTypes";

interface UserProps {
  id: number;
  name: string;
  website: string;
  company: Company;
  email: string;
}

export default function User({ id, name, website, email, company }: UserProps) {
  return (
    <div className="user-card">
      <h3 className="user-name">{name}</h3>
      <div className="user-content">
        <span className="company-name">{company.name}</span>
        <span className="website">{website}</span>
        <span className="email">{email}</span>
      </div>
      <Link to={`/users/${id.toString()}`} className="view-btn">
        View
      </Link>
    </div>
  );
}
