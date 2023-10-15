import Banner from '@/components/Banner';

const Home = () => {
  return (
    <div className="min-h-[90vh] overflow-hidden bg-gradient-to-br from-mint/40 to-mint">
      <Banner />
      <main className="px-auto mt-0 md:hidden">
        <div className="max-h-max flex-col items-center justify-center">
          <div className="container mx-auto h-[80vh]">
            <p className="pt-6 text-center text-white">
              가보고 싶었던 곳을 잊고 귀가 하신 경험이 있지 않나요?
            </p>
            <p className="text-center text-white">
              이젠 잊지 말고 후회없이 하루를 보내세요!
            </p>
            <h2 className="text-5xl mb-8 pt-6 text-center font-bold text-white">
              나만의 Place, MARKER!
            </h2>
            <img src="/img/icon.png" alt="map" className="" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
