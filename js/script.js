window.onload = function () {

    $(function () {
      // enable tooltip
      $('[data-toggle="tooltip"]').tooltip();

      // enable toggle icon for collapse
      initCollapseIconToggle();


      /** 新着情報取得用スクリプト ここから**/

      // 言語判定（英語ページの場合は英語の情報を取得するため）
      var href = window.location.href;
      var prefix = 'ja';
      if(href.match('\/en')){
        prefix = 'en-us';
      }

      // APIリクエスト
      // リクエスト条件：最大取得件数4件、作成日で降順ソート
      const announce = 'https://skyway-support.zendesk.com/api/v2/help_center/'+prefix+'/sections/207255008/articles.json?sort_by=created_at&sort_order=desc&per_page=3';
      const maintenance = 'https://skyway-support.zendesk.com/api/v2/help_center/'+prefix+'/sections/207271047/articles.json?sort_by=created_at&sort_order=desc&per_page=3';
      const failure = 'https://skyway-support.zendesk.com/api/v2/help_center/'+prefix+'/sections/207255108/articles.json?sort_by=created_at&sort_order=desc&per_page=3';

      //新着情報サイトURL
      const announce_site = 'https://support.skyway.io/hc/'+prefix+'/sections/207255008';
      const maintenance_site = 'https://support.skyway.io/hc/'+prefix+'/sections/207271047';
      const failure_site = 'https://support.skyway.io/hc/'+prefix+'/sections/207255108';

      $.ajax({
        url: announce,
        type: 'GET',
        dataType: 'json',
        async: 'true'
      }).done(function(data) {
        updateNews(data,'announce',announce_site);
      }).fail(function(data) {
        console.log('xhr failed');
      });

      $.ajax({
        url: maintenance,
        type: 'GET',
        dataType: 'json',
        async: 'true'
      }).done(function(data) {
        updateNews(data,'maintenance',maintenance_site);
      }).fail(function(data) {
        console.log('xhr failed');
      });

      $.ajax({
        url: failure,
        type: 'GET',
        dataType: 'json',
        async: 'true'
      }).done(function(data) {
        updateNews(data,'failure',failure_site);
      }).fail(function(data) {
        console.log('xhr failed');
      });

    });

  /** 新着情報取得用スクリプト ここまで **/


};

// 最新情報のDom生成
function updateNews(obj,id,siteurl){
  var dom = '';
  for(var i = 0;i < obj.articles.length;i++){
    dom += '<div class="row"><div class="col-12 col-sm-2"><div class="mini-headline-date">'
      + obj.articles[i].body.substr(4,10)
      + '</div></div><div class="col-12 col-sm-10"><div class="mini-headline-text">'
      + obj.articles[i].body + '</div></div></div>'
  }
  dom += '<a  href=' + siteurl + ' target="_blank">'
    + 'すべてのニュース'
    + '</a>';
  $('#'+id).html(dom);
}

// アコーディオンのトグルアイコン変更
function initCollapseIconToggle(){
  $('#collapseOne, #collapseTwo, #collapseThree').on({
    // 折り畳み開く処理
    'show.bs.collapse': function() {
      $('a[href="#' + this.id + '"] i.fa-chevron-down')
        .removeClass('fa-chevron-down')
        .addClass('fa-chevron-up');
    },
    // 折り畳み閉じる処理
    'hide.bs.collapse': function() {
      $('a[href="#' + this.id + '"] i.fa-chevron-up')
        .removeClass('fa-chevron-up')
        .addClass('fa-chevron-down');
    }
  });
}