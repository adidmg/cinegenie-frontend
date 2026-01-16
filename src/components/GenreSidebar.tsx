import {
  BookOpen,
  Laugh,
  FileText,
  Theater,
  Users,
  Sparkles,
  Landmark,
  Ghost,
  Music,
  Search,
  Heart,
  Rocket,
  Trophy,
  AlertTriangle,
  KayakIcon,
  SwordsIcon,
  Panda,
  BombIcon,
  SliceIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import "../index.css";

const GenreSidebar = () => {
  const currentPath = useLocation().pathname;
  const genres = [
    {
      name: "Action",
      icon: BombIcon,
      path: "/genres/Action/",
    },
    {
      name: "Adventure",
      icon: KayakIcon,
      path: "/genres/Adventure/",
    },
    {
      name: "Animation",
      icon: Panda,
      path: "/genres/Animation/",
    },
    {
      name: "Biography",
      icon: BookOpen,
      path: "/genres/Biography/",
    },
    {
      name: "Comedy",
      icon: Laugh,
      path: "/genres/Comedy/",
    },
    {
      name: "Crime",
      icon: SliceIcon,
      path: "/genres/Crime/",
    },
    {
      name: "Documentary",
      icon: FileText,
      path: "/genres/Documentary/",
    },
    {
      name: "Drama",
      icon: Theater,
      path: "/genres/Drama/",
    },
    {
      name: "Family",
      icon: Users,
      path: "/genres/Family/",
    },
    {
      name: "Fantasy",
      icon: Sparkles,
      path: "/genres/Fantasy/",
    },
    {
      name: "Historical",
      icon: Landmark,
      path: "/genres/Historical/",
    },
    {
      name: "Horror",
      icon: Ghost,
      path: "/genres/Horror/",
    },
    {
      name: "Musical",
      icon: Music,
      path: "/genres/Musical/",
    },
    {
      name: "Mystery",
      icon: Search,
      path: "/genres/Mystery/",
    },
    {
      name: "Romance",
      icon: Heart,
      path: "/genres/Romance/",
    },
    {
      name: "Sci-Fi",
      icon: Rocket,
      path: "/genres/Sci-Fi/",
    },
    {
      name: "Sports",
      icon: Trophy,
      path: "/genres/Sports/",
    },
    {
      name: "Thriller",
      icon: AlertTriangle,
      path: "/genres/Thriller/",
    },
    {
      name: "War",
      icon: SwordsIcon,
      path: "/genres/War/",
    },
    {
      name: "Western",
      icon: "/src/assets/cowboy-hatt.svg",
      path: "/genres/Western/",
    },
  ];
  return (
    <>
      <div className="bg-[#1d1c20de] h-18 m-0.5 grid items-center p-5 rounded-2xl drop-shadow-4xl">
        Genres
      </div>
      <ul>
        {genres.map((genre) => {
          const Icon = genre.icon;
          const isActive = currentPath === genre.path;
          return (
            <li
              key={genre.name}
              className={isActive ? "li-style-active " : "li-style "}
            >
              <NavLink to={genre.path} className="flex items-center space-x-2">
                {typeof Icon === "string" ? (
                  <img src={Icon} className="w-6 h-6" />
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                <span>{genre.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default GenreSidebar;
