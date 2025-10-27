import { projects } from "../data/projects";

function Projects() {
  return (
    <MainLayout>
      <section>
        {projects.map((p, idx) => (
          <div key={idx}>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.link}>Ver</a>
          </div>
        ))}
      </section>
    </MainLayout>
  );
}
