const arr = [
  "Хлорсодержащие препараты<split>(15)",
  "Активный оксид алюминия<split>(15)",
  "Гидроантрацит<split>(15)",
  "Реагенты для котельной и ТЭЦ<split>(92)",
  "Ионообменные смолы<split>(55)",
  "Техническая химия<split>(88)",
  "Активированные угли<split>(88)",
  "Гликоли<split>(87)",
  "Пеногасители<split>(6)",
  "Силикагель<split>(6)",
  "Сульфат алюминия<split>(22)",
  "Глицерин<split>(23)",
  "Полиоксихлорид алюминия<split>(22)",
  "Щелочь / Натр едкий<split>(9)",
  "Реагенты<split>(7)",
  "Флокулянты<split>(54)",
  "Комплексонаты и ингибиторы<split>(3)",
  "Кварцевый песок<split>(3)",
  "Цеолиты<split>(64)",
  "Кислоты<split>(2)",
  "Сорбенты<split>(4)",
  "Мешки для обезвоживания<split>(54)",
  "Хлорное железо<split>(44)",
  "Антигололедные реагенты<split>(54)",
  "Растворители<split>(22)",
  "Минеральные удобрения<split>(64)",
  "Термочехлы<split>(5)",
  "Неонолы и синатолы<split>(2)",
  "Биопрепараты<split>(12)",
  "Химические реактивы<split>(2)",
  "Теплоносители<split>(11)",
  "Фильтрующий материал<split>(2)",
  "Химия для бассейна<split>(21)",
  "Дезинфицирующие средства<split>(21)",
  " Шунгит<split>(8)",
  "Тара<split>(5)",
  "Зимний инвентарь<split>(8)",
  "Пищевые добавки<split>(3)",
  "Укрывные материалы<split>(3)",
];

let strg = "";
arr.forEach((item) => {
  let splt = item.split("<split>");
  let ns = `<div class="col-md-4">
  <div class="catalog-table__collapse">
    <button class="catalog-table__collapse-btn" type="button">
      <span class="catalog-table__collapse-btn-content">
        <span class="catalog-table__collapse-btn-text">
          ${splt[0]}
        </span>
        <span class="catalog-table__collapse-btn-quantity">
          ${splt[1]}
        </span>
      </span>
      <i class="icon-chevron"></i>
    </button>
    <div class="catalog-table__collapse-body-wrap">
      <div class="catalog-table__collapse-body">
        <div class="catalog-table__collapse-body-header"></div>
        <div class="catalog-table__collapse-body-item">
          <a href="#">Test link 1</a>
        </div>
        <div class="catalog-table__collapse-body-item">
          <a href="#">Test link 2</a>
        </div>
        <div class="catalog-table__collapse-body-item">
          <a href="#">Test link 3</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
  strg += ns;
});
console.log(arr.length);
console.log(strg);
