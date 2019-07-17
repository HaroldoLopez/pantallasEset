//$('.archivo' ).hide();
$(document).ready(function(){

    //pantalla Vertical arriba
    //$("input[name=pV1]").filter('[value=video]').prop('checked', true);

    $("input[name=pV1]").change(function(){
        this.value
        $(".archivoV1").show(300);
    });

    //pantalla Vertical abajo
    //$("input[name=pV2]").filter('[value=video]').prop('checked', true);

    $("input[name=pV2]").change(function(){
        this.value
        $(".archivoV2").show(300);
    });

    //pantalla Horizontal
    //$("input[name=pH]").filter('[value=video]').prop('checked', true);
    $("input[name=pH]").change(function(){
        this.value
        $(".archivoH").show(300);
    });
});