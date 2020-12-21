const loadI18n = (languageCode) =>
  new Promise((resolve, reject) => {
    const languageMap = ["en", "fr", "es"];
    i18next.init(
      {
        lng: "en",
        debug: true,
        resources: {
          en: {
            translation: {
              name: "YouTube downloader",
            },
          },
          fr: {
            translation: {
              name: "YouTube downloader",
            },
          },
          es: {
            translation: {
              name: "YouTube downloader",
            },
          },
        },
      },
      function (err, t) {
        // initialized and ready to go!
        // document.getElementById('output').innerHTML = i18next.t('key');
        if (err) {
          reject(err);
          return;
        }

        i18next
          .changeLanguage(
            languageMap.includes(languageCode) ? languageCode : "en"
          )
          .then((t) => {
            resolve(t);
          });
      }
    );
  });
