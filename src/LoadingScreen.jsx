import { useProgress } from "@react-three/drei";

export const LoadingScreen = ({ started, onStarted }) => {
  const { progress } = useProgress();
  return (
    <div className={`loadingScreen ${started ? "loadingScreen--started" : ""}`}>
      <div className="loadingScreen__board">
        <button
            className="loadingScreen__button bg-opacity-0"
            disabled={progress < 100}
            onClick={onStarted}
          >
          {(progress==100 ? "Click to start" : Math.floor(progress).toString()+"% loaded" )}
        </button>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
        <div className="stars"></div>
      </div>
    </div>
  );
};
