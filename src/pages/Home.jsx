
import ListEvents from "../components/list_event/ListEvents";
import SearchBar from "../components/Search_bar/SearchBar";


export default function Home() {
  return (

    <>
      <header>
        <SearchBar />
      </header>

      <main>
        <section>
          <ListEvents />
        </section>

        <section>
          
        </section>

      </main>
    </>

  );
}
