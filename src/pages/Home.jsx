<<<<<<< HEAD
import Toolbar from "../components/toolbar/Toolbar";
import EvenementSelected from "../components/event_selected/EvenementSelected";
=======
import EventSelected from "../components/event_selected/EventSelected";
>>>>>>> 83e61ad08c72bbd3f03c7626b9591641050a68ad
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
