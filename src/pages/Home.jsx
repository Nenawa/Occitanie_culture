import Toolbar from "../components/toolbar/Toolbar";
import EventSelected from "../components/event_selected/EventSelected";
import ListEvents from "../components/list_event/ListEvents";
import SearchBar from "../components/Search_bar/SearchBar";


export default function Home() {
  return (

    <>
      <header>
        <Toolbar />
        <SearchBar />
      </header>

      <main>
        <section>
          <ListEvents />
        </section>

        <section>
          <EventSelected />
        </section>

      </main>
    </>

  );
}
