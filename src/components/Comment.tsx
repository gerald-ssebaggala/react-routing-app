interface CommentProps {
  email: string;
  body: string;
}

export default function Comment({ email, body }: CommentProps) {
  return (
    <div className="comment">
      <small className="email">{email}</small>
      <p className="comment-body">{body}</p>
    </div>
  );
}
