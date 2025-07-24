import { Input } from "@/components/ui/form";
import { Label } from "@/components/ui/label";

interface AuthFormProps {
  title?: string;
  onSubmit: (e: React.FormEvent) => void;
  header?: React.ReactNode;
}

export const AuthForm: React.FC<AuthFormProps> = ({ title, onSubmit, header }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-h-10xl max-w-lg p-8 bg-gray-950 rounded-xl shadow-md backdrop-blur-md border-gray-700 border-2 border-solid"
    >
      {header && (
        <div className="mb-4">
          {header}
        </div>
      )}
      <h2 className="text-3xl  text-center tracking-widest text-border-white font-semibold font-orbitron mb-6 text-white">
        {title}
      </h2>

      <div className="mb-4">
        <Label htmlFor="email" className="text-white">Email</Label>
        <Input
          id="email"
          type="email"
          required
          placeholder="admin@example.com"
          className="mt-1 bg-white/10 text-white placeholder:text-zinc-400"
        />
      </div>

      <div className="mb-6">
        <Label htmlFor="password" className="text-white">Password</Label>
        <Input
          id="password"
          type="password"
          required
          placeholder="••••••••"
          className="mt-1 bg-white/10 text-white placeholder:text-zinc-400"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 font-semibold rounded bg-white text-black hover:bg-gray-700 transition duration-500 hover:text-white"
      >
        Login
      </button>
    </form>
  );
};
