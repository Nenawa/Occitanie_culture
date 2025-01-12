import ListEvents from "../components/list_event/ListEvents";
import SearchBar from "../components/Search_bar/SearchBar";

import { EventContextProvider } from "../context/EventContext";

export default function Home() {
  return (
    <EventContextProvider>
      <header>
        <SearchBar />
      </header>

      <main>
        <section>
          <ListEvents />
        </section>
      </main>
    </EventContextProvider>
  );
}
