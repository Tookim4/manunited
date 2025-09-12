import Rooney from '../assets/rooney.png';

export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left: form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-black text-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-heading text-red-600 mb-6">{title}</h2>
          {children}
        </div>
      </div>

      {/* Right: image (hidden on mobile) */}
      <div
        className="hidden md:block flex-1 bg-cover bg-center"
        style={{ backgroundImage: `url(${Rooney})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
      />
    </div>
  );
}
