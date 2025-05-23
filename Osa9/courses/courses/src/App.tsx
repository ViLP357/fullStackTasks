interface HeaderProps {
  name: string;
}

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  content: CoursePart[];
}


const Header = (props: HeaderProps) => {
  return (
    <p>{props.name}</p>
  )
};

const Content = (props: ContentProps) => {
  return (
    <div>
    {props.content.map((part, index) => (
      <p key={index}>
        {part.name} {part.exerciseCount}
      </p>
    ))}
    </div>
  );
};

const Total = (props: ContentProps) => {
  const totalExercises = props.content.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>{totalExercises}</p>
  )
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  //const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name = {courseName}></Header>
      <Content content = {courseParts} ></Content>
      <Total content={courseParts}></Total>
    </div>

  );
};

export default App;