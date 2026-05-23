import RankingTable from "../../components/RankingTable/RankingTable";

const Home = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
          Posiciones del <span className="text-primary">Prode</span>
        </h1>
        <p className="mt-3 text-secondary text-base sm:text-lg">
          Compite con tus amigos y demuestra quién sabe más de fútbol.
        </p>
      </header>

      <section className="mt-8 max-w-3xl mx-auto">
        <RankingTable />
      </section>
    </main>
  );
};

export default Home;
