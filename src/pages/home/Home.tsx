import TopBox from "../../components/topBox/TopBox";
import PromptInput from "../../components/prompt/Prompt";
import "./home.scss";
const Home = () => {
  return (
    <div className="home">
      <div className="box box1">{<PromptInput />}</div>
      <div className="box box4">
        <TopBox />
      </div>
    </div>
  );
};

export default Home;
