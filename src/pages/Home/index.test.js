import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import EventList from "../../containers/Events";
import PeopleCard from "../../components/PeopleCard";
import EventCard from "../../components/EventCard";

const data = {
  events: [
    {
      "id": 1,
      "type": "conférence",
      "date": "2022-04-29T20:28:45.744Z",
      "title": "User&product MixUsers",
      "cover": "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      "description": "Présentation des nouveaux usages UX.",
      "nb_guesses": 900,
      "periode": "14-15-16 Avril",
      "prestations": [
          "1 espace d’exposition",
          "1 scéne principale",
          "1 espace de restaurations"
      ]
    },
    {
      "id": 2,
      "type": "expérience digitale",
      "date": "2022-01-29T20:28:45.744Z",
      "title": "#DigitonPARIS",
      "cover": "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      "description": "Présentation des outils analytics aux professionnels du secteur ",
      "nb_guesses": 1300,
      "periode": "24-25-26 Février",
      "prestations": [
          "1 espace d’exposition",
          "1 scéne principale",
          "1 site web dédié"
      ]
    },
  ],
};

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(data);
    render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );
    await screen.findByText("User&product MixUsers");
    await screen.findByText("avril");
    await screen.findByText("conférence");
  })
  it("a list a people is displayed", () => {
    screen.findByText("Alice")
    screen.findByText("Directeur marketing")
    screen.findByText("Animateur")
    screen.findByText("Christine")
    render (<PeopleCard/>)
    const selectElement = screen.getByTestId("card-image-testid");
    expect(selectElement).toBeInTheDocument();
  })
  it("a footer is displayed", () => {
    screen.findByText("Une agence événementielle propose des prestations de service spécialisées dans la conception et l'organisation de divers événements tels que des événements festifs, des manifestations sportives et culturelles, des événements professionnels")
    screen.findByText("45 avenue de la République, 75000 Paris")
    screen.findByText("01 23 45 67 89")
    screen.findByText("contact@77events.com")

  })
  it("an event card, with the last event, is displayed", () => {window.console.error = jest.fn();
    screen.findByText("Conférence #ProductCON");
    screen.findByText("août");
    screen.findByText("boom");
    render (<EventCard/>)
    const selectElement = screen.getByTestId("card-image-testid");
    expect(selectElement).toBeInTheDocument();
  })
});
