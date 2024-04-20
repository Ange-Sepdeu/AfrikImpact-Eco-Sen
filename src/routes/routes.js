import Home from "../screens/Home";
import AboutUs from "../screens/AboutUs"
import JoinUs from "../screens/JoinUs"
import ActionLocation from "../screens/ActionLocation"
import OurActions from "../screens/OurActions"
import SupplyAid from "../screens/SupplyAid"
import Training from "../screens/Training"
import ActualitesDetails from "../screens/ActualitesDetails";
import Login from "../screens/Login";
import Admin from "../screens/Admin";
import Register from "../screens/Register";
import PublicationDetails from "../screens/PublicationDetails";
import AgendaComplet from "../screens/AgendaComplet";
import CompleteVideo from "../screens/CompleteVideo";
import Offres from "../screens/Offres";

export const ROUTES = [
    {
        route: "/",
        element: Home,
        exact: true
    },
    {
        route: "qui-sommes-nous",
        element: AboutUs
    },
    {
        route: "nos-actions",
        element: OurActions
    },
    {
        route: "ou-agissons-nous",
        element: ActionLocation
    },
    {
        route: "nous-rejoindre",
        element: JoinUs
    },
    {
        route: "nous-soutenir",
        element: SupplyAid
    },
    {
        route: "formations-et-projets",
        element: Training
    },
    {
        route: "details-publication",
        element: PublicationDetails
    },
    {
        route: "details-actualite",
        element: ActualitesDetails
    },
    {
        route: "tous-agendas",
        element: AgendaComplet
    },
    {
        route: "toutes-videos",
        element: CompleteVideo
    },
    {
        route: "connexion",
        element: Login
    },
    {
        route: "inscription",
        element: Register
    },
    {
        route: "espace-administrateur",
        element: Admin
    },
    {
        route: "offres",
        element: Offres
    }
]