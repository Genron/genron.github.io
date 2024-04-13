import {pdf} from "@react-pdf/renderer";
import {MyDocument} from "../MyDocument";
import {Lang, Language} from "../App";
import {CV} from "../types/types";

export function downloadCV(cv: CV, avatar: string, selectedLanguage: Lang) {
  return () => {
    pdf(<MyDocument cv={cv} avatar={avatar} lang={selectedLanguage}/>)
      .toBlob()
      .then(blob => {
        console.log('blob');
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedLanguage.filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      });
  };
}

export function from(o: any): string {
  return JSON.stringify(o);
}

interface LocationMap {
  [key: string]: string;
}

function useLocation(): LocationMap {
  return window.location.search
    .split(/[?&]/)
    .reduce((m, c) => {
      const [key, value] = c.split('=');
      if (key) {
        return Object.assign(m, {[key]: value});
      }
      return m;
    }, {});
}

export function useLanguageLocation(lang: Lang) {
  const map = useLocation();
  if (map.l) {
    return Language[map.l.toUpperCase()] || lang;
  }
  return lang;
}