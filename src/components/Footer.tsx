import { GithubIcon, LinkedinIcon, MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <div className="p-5">
      Cinegenie
      <p className="h-8">Developed by Aditya</p>
      <ul className="flex flex-col md:flex-row gap-6">
        <li>
          <a href=""></a>
          <a
            href="https://github.com/adidmg"
            target="_blank"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <span className="flex h-10 w-10 bg-black rounded-4xl justify-center items-center">
              <GithubIcon size={20} />
            </span>
            View GitHub
          </a>
        </li>
        <li>
          <a
            href="mailto:ad@gmail.com?subject=Regarding%20CenieGenie&body=Hi%20"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <span className="flex h-10 w-10 bg-red-600 rounded-4xl justify-center items-center">
              <MailIcon size={20} />
            </span>
            Contact me via email
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/aditya-r-a93056232/"
            target="_blank"
            style={{ display: "flex", gap: "10px", alignItems: "center" }}
          >
            <span className="flex h-10 w-10 bg-[#4166bb] rounded-4xl justify-center items-center">
              <LinkedinIcon size={20} fill="white" strokeWidth={0.5} />
            </span>
            View my LinkedIn
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
