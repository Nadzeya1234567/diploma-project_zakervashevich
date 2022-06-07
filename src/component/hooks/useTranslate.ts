import { useEffect, useState } from "react";

import en from "../../translations/en.json";
import ru from "../../translations/ru.json";

//ЗАДАЧА хука: 1. иметь перем языка и ее возвращать, чтобы любой компонент знал, какой язык сейчас.
//2. И возможность переключать этот язык. 3. переводить

type TranslateType = {
  [prop: string]: string;
};

type TranslatesType = {
  [prop: string]: TranslateType;
};

const translates: TranslatesType = { en, ru };

//нам нужно изменять перем lang, чтобы ее видели другие комп-ты
let lang: string = localStorage.getItem("lang") || "en";

//массив колбэков - нужно вызвать каждый при изменении языка
let callbacks: Array<(lang: string) => void> = [];

const useTranslate = () => {
  const [langState, setLangState] = useState<string>(lang);

  // 1. Когда рендериться компонент
  //    1.1. получить актуальный язык (перем lang складываем в useState)
  //    1.2. получать обновления (массив подписок, выполняет useEffect: что делать в момент создания и удаления эл-та)
  // 2. Иметь возможноть изменить язык
  //    2.1. обновить глобальную переменную, для 1.1.
  //    2.2. проинформировать все компоненты об изменении, для 1.2.

  useEffect(() => {
    //подписываемся на обновления языка
    callbacks.push(setLangState);
    return () => {
      //отписываемся от обновлений языка(нов массив, в кот. попадут все эл-ты, кот.были до этого, кроме setLangState. setLangState === setLangState, не меняется!)
      callbacks = callbacks.filter((f) => f !== setLangState);
    };
  }, []);

  const setLang = (_lang: string) => {
    console.log(`${lang} => ${_lang}`);
    lang = _lang;
    localStorage.setItem("lang", lang);
    //говорим: смотри, язык изменился
    callbacks.forEach((callback) => callback(lang));
  };

  const translate = (id: string) => {
    const translate = translates[langState];
    return translate[id] || id;
  };

  return {
    lang: langState,
    setLang,
    translate,
  };
};

export default useTranslate;
