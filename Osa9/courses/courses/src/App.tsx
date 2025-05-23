interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}
interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}
interface CoursePartRequirements extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}
type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;
////
interface HeaderProps {
  name: string;
}

//interface NormalCoursePart {
//  name: string;
//  exerciseCount: number;
//}

interface ContentProps {
  content: CoursePart[];
}

const Header = (props: HeaderProps) => {
  return (
    <h2>{props.name}</h2>
  )
};

const Part = (props:  {part : CoursePart}) => {
  switch (props.part.kind) {
    case "background":
      return (
        <div>
        <h4>{props.part.name} {props.part.exerciseCount}</h4> 
        <p>{props.part.description}</p>
        <p> {props.part.backgroundMaterial}</p>
        </div>
      )
    case "group":
      return (
        <div>
        <h4>{props.part.name} {props.part.exerciseCount}</h4>
        <p>prject exercises {props.part.groupProjectCount}</p>
        </div>
      )

    case "basic": 
      return (
        <div>
        <h4>{props.part.name} {props.part.exerciseCount} </h4>
        <p> {props.part.description}</p>
        </div>
      )
    case "special":
      return (
        <div>
        <h4>{props.part.name} {props.part.exerciseCount} </h4>
        <p>{props.part.description} </p>
        <p>Required skills:  

          {props.part.requirements.map((r) => (
          <> {r}</>
        ))}
        </p>
        </div>
      )
    default: 
      throw new Error("Missing kind of the course");
  }

}

const Content = (props: ContentProps) => {
  return (
    <div>
    {props.content.map((part) => (
        <Part part = {part}></Part>
    ))}
    </div>
  );
};

const Total = (props: ContentProps) => {
  const totalExercises = props.content.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <h5>Number of exercises {totalExercises}</h5>
  )
};

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
  name: "Backend development",
  exerciseCount: 21,
  description: "Typing the backend",
  requirements: ["nodejs", "jest"],
  kind: "special"
  }
];

  return (
    <div>
      <Header name = {courseName}></Header>
      <Content content = {courseParts} ></Content>
      <Total content={courseParts}></Total>
    </div>

  );
};

export default App;