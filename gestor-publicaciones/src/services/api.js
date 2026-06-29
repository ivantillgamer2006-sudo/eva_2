// src/services/api.js
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const spanishPosts = [
  {
    userId: 1,
    id: 1,
    title: "📚 8 de marzo: Día Internacional de la Mujer",
    body: "El 8 de marzo se conmemora la lucha de las mujeres por la igualdad de derechos. Esta fecha recuerda las marchas y protestas de trabajadoras textiles en Nueva York (1857) y la histórica huelga de mujeres en Rusia (1917) que marcó el inicio de la Revolución."
  },
  {
    userId: 1,
    id: 2,
    title: "✊ Sufragio femenino: un logro histórico",
    body: "En 1893, Nueva Zelanda se convirtió en el primer país en otorgar el voto a las mujeres. En América Latina, Uruguay fue pionero en 1932, seguido por Argentina en 1947 y México en 1953. La lucha por el sufragio femenino duró décadas."
  },
{
  userId: 1,
  id: 3,
  title: "📖 Simone de Beauvoir y 'El Segundo Sexo'",
  body: "Publicado en 1949, este libro revolucionario sentó las bases del feminismo moderno. Beauvoir afirmaba: 'No se nace mujer, se llega a serlo', cuestionando los roles de género impuestos por la sociedad."
},
  {
    userId: 1,
    id: 4,
    title: "🌈 25 de noviembre: Día contra la Violencia hacia la Mujer",
    body: "Esta fecha conmemora el asesinato de las hermanas Mirabal en República Dominicana (1960), quienes luchaban contra la dictadura de Trujillo. Hoy es un día para visibilizar y erradicar todas las formas de violencia machista."
  },
  {
    userId: 1,
    id: 5,
    title: "♀️ Malala Yousafzai: lucha por la educación femenina",
    body: "Malala, la ganadora más joven del Premio Nobel (2014), defendió el derecho de las niñas a la educación en Pakistán. A los 15 años sobrevivió a un ataque talibán y se convirtió en símbolo mundial de la resistencia."
  },
  {
    userId: 1,
    id: 6,
    title: "🎵 Las sufragistas y su himno de lucha",
    body: "El movimiento sufragista británico adoptó el himno 'March of the Women' en 1910. Las mujeres usaban colores: verde (esperanza), blanco (pureza) y púrpura (dignidad) para simbolizar su causa."
  },
  {
    userId: 1,
    id: 7,
    title: "📜 Declaración de los Derechos de la Mujer (1791)",
    body: "Olympe de Gouges redactó este documento en Francia, reivindicando la igualdad de derechos políticos y sociales. Fue guillotinada por sus ideas durante el Terror de la Revolución Francesa."
  },
  {
    userId: 1,
    id: 8,
    title: "👩‍⚕️ Clara Zetkin y el 8 de marzo",
    body: "Zetkin, activista alemana, propuso en 1910 establecer el Día Internacional de la Mujer durante la Conferencia Internacional de Mujeres Socialistas. Su idea se expandió por todo el mundo."
  },
  {
    userId: 1,
    id: 9,
    title: "💪 Las sufragistas en Estados Unidos",
    body: "La Marcha de las Sufragistas en Washington (1913) fue un hito. Alice Paul organizó el evento y lideró la lucha que culminó con la 19ª Enmienda (1920), que otorgó el voto a las mujeres en EE.UU."
  },
  {
    userId: 1,
    id: 10,
    title: "🌎 Movimiento Ni Una Menos",
    body: "Nacido en Argentina en 2015, Ni Una Menos es un movimiento feminista contra la violencia machista. Se ha extendido por América Latina y el mundo, con multitudinarias marchas cada año."
  },

  {
    userId: 2,
    id: 11,
    title: "🏳️‍🌈 28 de junio: Día del Orgullo LGBT+",
    body: "El Orgullo conmemora los disturbios de Stonewall en Nueva York (1969), donde la comunidad LGBT+ se rebeló contra la represión policial. Este evento marcó el inicio del movimiento moderno por los derechos LGBT+."
  },
  {
    userId: 2,
    id: 12,
    title: "💜 Harvey Milk: primer político abiertamente gay en EE.UU.",
    body: "Elegido en 1977 como supervisor municipal de San Francisco, Milk fue un defensor de los derechos LGBT+. Su asesinato en 1978 lo convirtió en mártir de la comunidad y símbolo de la lucha por la igualdad."
  },
  {
    userId: 2,
    id: 13,
    title: "🏳️‍⚧️ Marsha P. Johnson: pionera trans",
    body: "Marsha fue una activista trans afroamericana clave en los disturbios de Stonewall. Fundó la organización STAR (Street Transvestite Action Revolutionaries) para apoyar a personas trans y sin hogar."
  },
  {
    userId: 2,
    id: 14,
    title: "📜 La despatologización de la homosexualidad",
    body: "En 1973, la Asociación Americana de Psiquiatría eliminó la homosexualidad del DSM. En 1990, la OMS también la eliminó de su lista de enfermedades mentales, un logro histórico para la comunidad."
  },
  {
    userId: 2,
    id: 15,
    title: "🌈 El matrimonio igualitario en el mundo",
    body: "Holanda fue el primer país en legalizar el matrimonio igualitario en 2001. Argentina fue pionera en América Latina en 2010. Hoy, más de 30 países han reconocido este derecho fundamental."
  },
  {
    userId: 2,
    id: 16,
    title: "📖 Sylvia Rivera: activista trans y latina",
    body: "Rivera, de origen puertorriqueño, fue una figura clave en Stonewall. Luchó por la inclusión de las personas trans en el movimiento LGBT+ y denunció el racismo y la discriminación dentro de la comunidad."
  },
  {
    userId: 2,
    id: 17,
    title: "💪 Día contra la Homofobia (17 de mayo)",
    body: "El 17 de mayo conmemora la decisión de la OMS de eliminar la homosexualidad de su lista de enfermedades (1990). Es un día para visibilizar y combatir la discriminación hacia la comunidad LGBT+."
  },
  {
    userId: 2,
    id: 18,
    title: "🏳️‍🌈 Bandera del Orgullo: símbolo de diversidad",
    body: "Creada por Gilbert Baker en 1978, la bandera arcoíris representa la diversidad sexual. Los colores simbolizan: rojo (vida), naranja (sanación), amarillo (luz), verde (naturaleza), azul (armonía) y morado (espíritu)."
  },
  {
    userId: 2,
    id: 19,
    title: "📺 La visibilidad en la cultura popular",
    body: "En 2018, la película 'Bohemian Rhapsody' visibilizó la vida de Freddie Mercury, ícono gay. También series como 'Pose' y 'Rupaul's Drag Race' han dado visibilidad a la cultura drag y trans."
  },
  {
    userId: 2,
    id: 20,
    title: "💜 Audre Lorde: escritora y activista",
    body: "Lorde, afroamericana y lesbiana, escribió sobre la interseccionalidad de la opresión. Su obra 'Zami: Una nueva forma de escribir mi nombre' es un clásico de la literatura feminista y LGBT+."
  },

  {
    userId: 3,
    id: 21,
    title: "🐾 Día Mundial de los Animales (4 de octubre)",
    body: "El 4 de octubre se celebra en honor a San Francisco de Asís, patrono de los animales. Esta fecha promueve la protección animal y la conciencia sobre el maltrato hacia las especies."
  },
  {
    userId: 3,
    id: 22,
    title: "📖 Peter Singer y la liberación animal",
    body: "En 1975, el filósofo australiano publicó 'Liberación Animal', obra fundacional del movimiento animalista. Singer argumentó que el especismo es una forma de discriminación injusta."
  },
  {
    userId: 3,
    id: 23,
    title: "🐄 Día Mundial del Veganismo (1 de noviembre)",
    body: "Cada 1 de noviembre se promueve el estilo de vida vegano, que rechaza el consumo y uso de productos de origen animal. El veganismo crece como respuesta a la crueldad animal y el impacto ambiental."
  },
  {
    userId: 3,
    id: 24,
    title: "🌳 Jane Goodall: defensora de los chimpancés",
    body: "Goodall revolucionó la primatología con su investigación sobre chimpancés en Tanzania (1960). Su trabajo demostró su inteligencia y comportamiento social, y promueve su conservación."
  },
  {
    userId: 3,
    id: 25,
    title: "🐋 1986: Moratoria sobre la caza de ballenas",
    body: "La Comisión Ballenera Internacional estableció una moratoria en 1986 para proteger a las ballenas. Aunque algunos países la violan, esto ha sido un logro clave para la conservación marina."
  },
  {
    userId: 3,
    id: 26,
    title: "🦁 La lucha contra el maltrato en circos",
    body: "En 2018, México y otros países prohibieron el uso de animales en circos, tras décadas de denuncias de activistas. Los animales eran sometidos a condiciones inhumanas y entrenamiento violento."
  },
  {
    userId: 3,
    id: 27,
    title: "🐾 La adopción como estilo de vida",
    body: "Cada vez más personas optan por adoptar animales en lugar de comprarlos. Se estima que millones de perros y gatos viven en refugios esperando un hogar. ¡Adoptar salva vidas!"
  },
  {
    userId: 3,
    id: 28,
    title: "🌱 El impacto de la ganadería en el clima",
    body: "La ganadería industrial es responsable del 14.5% de las emisiones de gases de efecto invernadero. Reducir el consumo de carne es una de las formas más efectivas de combatir el cambio climático."
  },
  {
    userId: 3,
    id: 29,
    title: "🐶 Leyes de protección animal en América Latina",
    body: "Argentina, Chile, México y otros países han avanzado en leyes contra el maltrato animal. En 2020, México tipificó el maltrato animal como delito federal, un paso importante."
  },
  {
    userId: 3,
    id: 30,
    title: "🐺 El lobo mexicano: especie en peligro",
    body: "El lobo mexicano (Canis lupus baileyi) es una especie en peligro de extinción. Programas de conservación buscan reintroducirlos en su hábitat natural, donde juegan un rol ecológico vital."
  },

  // --- TEMAS COMBINADOS (Interseccionalidad) ---
  {
    userId: 4,
    id: 31,
    title: "♀️🏳️‍🌈 Feminismo y diversidad: Angela Davis",
    body: "Angela Davis, filósofa y activista, ha sido clave en la lucha contra el racismo, el sexismo y la homofobia. Su obra 'Mujeres, raza y clase' (1981) conecta estas luchas desde una perspectiva interseccional."
  },
  {
    userId: 4,
    id: 32,
    title: "🐣 El vínculo entre feminismo y veganismo",
    body: "El ecofeminismo vincula la opresión animal con la opresión de la mujer. Carol J. Adams, en 'La política sexual de la carne' (1990), explora cómo el patriarcado y el especismo están conectados."
  },
  {
    userId: 4,
    id: 33,
    title: "🌎 Activismo juvenil por los derechos",
    body: "Jóvenes como Greta Thunberg (clima) y Emma González (control de armas) han mostrado cómo las nuevas generaciones luchan por un mundo más justo, inclusivo y sostenible."
  },
  {
    userId: 4,
    id: 34,
    title: "📢 Interseccionalidad: todas las luchas son una",
    body: "El concepto de interseccionalidad, acuñado por Kimberlé Crenshaw, muestra cómo el sexismo, el racismo, la homofobia y el especismo se cruzan y refuerzan mutuamente."
  },
  {
    userId: 4,
    id: 35,
    title: "💜 Audre Lorde: palabra y lucha",
    body: "Lorde afirmó: 'No hay lucha individual que no esté ligada a todas las luchas'. Su poesía y ensayos son un llamado a la acción contra todas las formas de opresión."
  },
  {
    userId: 4,
    id: 36,
    title: "✊🏿 Marsha P. Johnson y el inicio del activismo trans",
    body: "Johnson no solo luchó por los derechos LGBT+, sino también contra el racismo y la pobreza. Su legado inspira a quienes trabajan por la justicia social y animal."
  },
  {
    userId: 4,
    id: 37,
    title: "🌱 El feminismo, el animalismo y la ecología",
    body: "El 8 de marzo y el Día de la Tierra están conectados: las mujeres lideran la lucha contra el cambio climático y la protección de los animales en muchas comunidades rurales."
  },
  {
    userId: 4,
    id: 38,
    title: "📚 Educar en igualdad: clave para el futuro",
    body: "La educación feminista, inclusiva y respetuosa con los animales es esencial para construir una sociedad más justa. Los niños y niñas son el futuro del activismo."
  },
  {
    userId: 4,
    id: 39,
    title: "🐾 Día Internacional del Gato (8 de agosto)",
    body: "El 8 de agosto se celebra a los felinos, destacando su importancia en la cultura y la necesidad de protegerlos. También es un día para promover su adopción y cuidado responsable."
  },
  {
    userId: 4,
    id: 40,
    title: "🌈 2026: 56 años del movimiento LGBT+ moderno",
    body: "Han pasado 56 años desde Stonewall (1969). Aunque se han logrado muchos avances, aún queda trabajo por hacer contra la discriminación, la violencia y la exclusión de la comunidad LGBT+."
  }
];

export const fetchPosts = async () => {
  try {
    // Usamos las publicaciones en español
    return spanishPosts;
  } catch (error) {
    console.error('Error al obtener posts:', error);
    throw new Error('No se pudieron cargar las publicaciones.');
  }
};