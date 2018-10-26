$(function() {
  console.log('increment.js');
  function incrementalSearch(input, wrap, container){
    var searchWord;
    var keyupStack = [];

    input.on('keyup', function () {

       keyupStack.push(1);
       setTimeout(function () {
         keyupStack.pop();
         if (keyupStack.length === 0) {

           $.getJSON("sample_data/suggest_diseases.json", function(data) {
             wrap.html("");
             $(data.disease).each(function() {
               var diseaseName  = this.name;
               var diseaseKana  = this.kana;
               var pattern = input.val();
               var textNum = pattern.length;
               if(textNum > 0 ){
                   container.css('display', 'block');
                 if( diseaseName.indexOf(pattern) > -1 || diseaseKana.indexOf(pattern) > -1 ){
                  $('<li><a href="aaaa">' + this.name  + '<span class="num">' + this.doctors_count + '</span></a></li>').appendTo(wrap);
               }
             }else{
               container.css('display', 'none');
             }
             })
           })

         }
       }.bind(this), 500); // 0.5秒設定
     });
  }

  if (document.getElementById('searchDoctor')) {
    incrementalSearch($('#searchDoctor'), $('#suggestWord ul'), $('.suggest_word'));
  }

  if (document.getElementById('searchForm')) {
    incrementalSearch($('#searchForm'), $('#suggestWord01 ul'), $('#suggestWord01'));
  }

  if (document.getElementById('searchForm2')) {
    incrementalSearch($('#searchForm2'), $('#suggestWord02 ul'), $('#suggestWord02'));
  }

});
