import RankingTable from "../../components/RankingTable/RankingTable";
import LoginModal from "../../components/LoginModal/LoginModal";
import { useAuth } from "../../contexts/AuthContext";

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-grow items-center justify-center bg-gray-900 text-white font-mono uppercase tracking-widest">
        <p className="text-xl font-semibold animate-pulse">Cargando prode...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Posiciones del <span className="text-primary">Prode</span>
        </h1>
        <p className="mt-3 text-secondary text-base sm:text-lg">
          Compite con tus amigos y demuestra quién sabe más de fútbol.
        </p>
      </header>

      <section className="mt-8 max-w-3xl mx-auto w-full">
        <RankingTable />
      </section>

      {!user && <LoginModal />}
    </div>
  );
};

export default Home;
