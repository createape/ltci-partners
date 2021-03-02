$(function () {

  headerColor();
  $(window).scroll(function (e) {
    headerColor();
  });

  $(".hamburger").on("click", function () {
    $(this).toggleClass("is-active");
  });

  $('.hero-logo-slider__container').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $('.learn-explore__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    centerMode: true,
    centerPadding: "0px",
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,

        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          centerPadding: "20px",
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        }
      }
    ]
  });

  // $('.long-term-care__slider').slick({
  //   infinite: true,
  //   slidesToShow: 3,
  //   slidesToScroll: 1
  // });

  $('.about_us_team').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          arrows: false,
        }
      }
    ]
  });

  $('.testimonials__images').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    asNavFor: '.testimonials__text',
    fade: true,
  });

  $('.testimonials__text').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    asNavFor: '.testimonials__images',
    autoplay: true
  });

  $('[data-toggle="tooltip"]').tooltip()

  formMultiSteps();
});

function headerColor() {
  if ($(this).scrollTop() > 156) {
    $(".header").addClass("active");
  } else {
    $(".header").removeClass("active");
  }
}

function formMultiSteps() {

  var steps = [];
  var stepsTotal ={};
  var currentStep = {};
  var allInputs = [];
  function getSteps() {
    steps = [];
    stepsTotal ={answered:0,count:0,porcent:0,questions:[]};
    allInputs = [];
  var stepscontainer = $("#formMultiStep .form-item").each(function (index) {
      var step={};
      step.form = this;
      step.title = $(this).data("title");
      step.questions  = $(this).find("input,select,textarea");
      step.count = 0;
      step.answered = 0;
      step.requiredInput = 0;
      step.validAnswered = 0;
      step.index = index;
      step.inputs=[];
      var radio = [];
      var radioAswer = [];
      var radioValid = [];
      var radioRequired = [];
      //Counting the inputs
      step.questions.each(function () {

        if(!$(this).hasClass("no-count")){
          if(this.type =="radio" || this.type =="checkbox"){
            var radio_item=0;
            for (var index = 0; index < radio.length; index++) {
              if(radio[index] == this.name){
                radio_item++;
              }
            }
            if(radio_item == 0){
              step.count ++;
              radio.push(this.name);
            }
          }
          else{
            step.count ++;
          }

          if(this.type =="radio" || this.type =="checkbox"){
            if($(this).prop('checked')){
              stepsTotal.questions.push({name:this.name,value:this.value});
            }else{
              if(stepsTotal.questions[this.name]=="" || stepsTotal.questions[this.name]==undefined){
                stepsTotal.questions.push({name:this.name,value:""});
              }

            }
          }
          else{
            stepsTotal.questions.push({name:this.name,value:this.value});
          }

          //Counting the inputs with answer
          if(this.checkValidity() && this.value.length > 0){
            var radio_item=0;
            if(this.type =="radio" || this.type =="checkbox"){
              for (var index2 = 0; index2 < radioAswer.length; index2++) {
                if(radioAswer[index2] == this.name){
                  radio_item++;
                }
              }
              if(radio_item == 0){
                step.answered ++;
                radioAswer.push(this.name);
              }
            }else{
              step.answered ++;
            }
          }


        //Counting the valid inputs
          if(this.checkValidity()){
            if($(this).hasClass("is-invalid") ){
              $(this).removeClass("is-invalid");
              $(this).addClass("is-valid");
            }

            // var input = [];
            // input[this.name] = this.value;
            step.inputs[this.name] = this.value;
            var radio_item=0;
            if(this.type =="radio" || this.type =="checkbox"){
              for (var index3 = 0; index3 < radioValid.length; index3++) {

                if(radioValid[index3] == this.name){
                  radio_item++;
                }
              }
              if(radio_item == 0){
                step.validAnswered ++;
                radioValid.push(this.name);
              }
            }else{
              step.validAnswered ++;
            }
          }else{
            if($(this).hasClass("is-valid") ){
              $(this).addClass("is-invalid");
              $(this).removeClass("is-valid");
            }
          }
          //Counting the required inputs
          if($(this).prop('required')){
            var radio_item1=0;
            if(this.type =="radio" || this.type =="checkbox"){
              for (var index3 = 0; index3 < radioRequired.length; index3++) {

                if(radioRequired[index3] == this.name){
                  radio_item1++;
                }
              }
              if(radio_item1 === 0){
                step.requiredInput ++;
                radioRequired.push(this.name);
              }
            }else{
              step.requiredInput ++;
            }
          }
          step.isValid= step.validAnswered  >= step.requiredInput;
        }
      });

      step.porcent = (step.answered / step.count  ) * 100;
      stepsTotal.answered += step.answered;
      stepsTotal.count += step.count;
      stepsTotal.porcent = (stepsTotal.answered / stepsTotal.count  ) * 100;

      steps.push(step);

    });
    if(currentStep.index == undefined){
      currentStep = steps[0];
    }else{
      currentStep = steps[currentStep.index];
    }

    printCurrentContent();
  }

  condicionalDisplay();
  getSteps();
  showCurrentForm();
  showDisableHiddenBnt();

  function condicionalDisplay() {
    function setRequired(item,value) {
      $(item).find("input,textarea,select").each(function() {
        if(!$(this).hasClass("no-required")){
          $(this).prop('required', value);
        }

      });
    }
    function setNoCounting(item,value) {
      $(item).find("input,textarea,select").each(function() {
        if(value){
          $(this).addClass('no-count');
        }else{
          $(this).removeClass('no-count');
        }
      });

    }
    $(".condicional-diplay").each(function() {
      var data = $(this).data();
      var item = $("[name="+data.name+"]");
      if(item.length > 1){
        var val= null;
        item.each(function () {
          if($(this).prop('checked')){
            val = this;
          }
        });
        if($(val).val() == $(this).data("value")){
          $(this).removeClass("d-none");
          if(data.required){
            setRequired(this,true);
          }
          setNoCounting(this,false);
          var insideCOndicionaldisplay = $(this).find(".condicional-diplay");
          if(insideCOndicionaldisplay.length > 0){
            $(this).find(".condicional-diplay").each(function(params) {
              setRequired(this,false);
              setNoCounting(this,true);
            });
          }
        }else{
          $(this).addClass("d-none");
          if(data.required){
            setRequired(this,false);
          }
          setNoCounting(this,true);
        }
      }else{
        if(item.val() == $(this).data("value")){
          $(this).removeClass("d-none");
          if(data.required){
            setRequired(this,true);
            setNoCounting(this,false);
            var insideCOndicionaldisplay = $(this).find(".condicional-diplay");
            if(insideCOndicionaldisplay.length > 0){
              $(this).find(".condicional-diplay").each(function(params) {
                setRequired(this,false);
                setNoCounting(this,true);
              });
            }
          }
        }else if($(this).hasClass("no-empty")){
          if(item.val().length > 0){
            $(this).removeClass("d-none");
          }else{
            $(this).addClass("d-none");
          }
        }else{
          $(this).addClass("d-none");
          if(data.required){
            setRequired(this,false);
          }
          setNoCounting(this,true);
        }

      }
    });
  }

  function showDisableHiddenBnt(){
    //disable prevBtn
    if(currentStep.index === 0){
      $("#prevBtn").prop( "disabled", true );
    }else{
      $("#prevBtn").prop( "disabled", false);
    }
    //hidden Nextbtn
    if((currentStep.index == steps.length - 1)){
      $("#nextBtn").addClass("d-none");
      $("#submitBtn").removeClass("d-none");
    }else{
      $("#nextBtn").removeClass("d-none");
      $("#submitBtn").addClass("d-none");
    }

  }


  function showCurrentForm(){
    $(steps).each(function() {
      $(this.form).removeClass("active");
    });
    if($(currentStep.form).hasClass("done")){
      $(currentStep.form).removeClass("done");
    }
    $(currentStep.form).addClass("active");
  }
  function printCurrentContent() {

    $(".form-footer-progress .progress-bar").css({width:stepsTotal.porcent+"%"});
    $("#step-title").html(currentStep.title);
    $("#step-answered").html(currentStep.answered);
    $("#step-questions").html(currentStep.count);
  }

  $("#formMultiStep .form-item input,#formMultiStep .form-item select,#formMultiStep .form-item textarea" ).on("input change click",function () {
    condicionalDisplay();
    getSteps();
  });
  $("#prevBtn" ).on("click",function () {
    if(currentStep.index > 0){
      currentStep = steps[currentStep.index - 1];
      showCurrentForm();
      printCurrentContent();
      showDisableHiddenBnt();
      scrollToTop();
    }
  });

  $("#submitBtn" ).on("click",function () {

    if(currentStep.isValid){
      callAjax({
        portalId:"405630",
        formGUID:"7dc10c47-a690-4e1d-a93f-587ab169355f",
        data:stepsTotal.questions
      });
    }else{
      currentStep.questions.each(function (params) {
        $(this).removeClass("is-invalid");
        $(this).removeClass("is-valid");
      });
      currentStep.questions.each(function (params) {
        $(this).removeClass("is-invalid");
        if(this.checkValidity()){
          $(this).addClass("is-valid")
        }else{
          $(this).addClass("is-invalid")
        }

      });
    }
  });


  $("#nextBtn" ).on("click",function () {

    if(currentStep.isValid){
      if(currentStep.index < steps.length - 1){
        currentStep = steps[currentStep.index + 1];
        showCurrentForm();
        printCurrentContent();
        showDisableHiddenBnt();
        scrollToTop();
      }
    }else{
      currentStep.questions.each(function (params) {
        $(this).removeClass("is-invalid");
        $(this).removeClass("is-valid");
      });
      currentStep.questions.each(function (params) {
        $(this).removeClass("is-invalid");
        if(this.checkValidity()){
          $(this).addClass("is-valid")
        }else{
          $(this).addClass("is-invalid")
        }

      });
    }

  });
  $("#reset-the-form" ).on("click",function () {
    location.reload();
  });


  function scrollToTop() {
    var body = $("html, body");
    body.stop().animate({scrollTop:$(currentStep.form).offset().top - 200}, 500, 'swing');
  }

  // <!--[if lte IE 8]>
  // <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
  // <![endif]-->
  // <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
  // <script>
  //   hbspt.forms.create({
  // 	portalId: "405630",
  // 	formId: "7dc10c47-a690-4e1d-a93f-587ab169355f"
  // });
  // </script>

  function callAjax(payload){
    //- formSelector
    //- portalId
    //- formGUID
    //- hideMessageTime
    //- callback
    //
    var $form = $(payload.formSelector);
    var form = $form[0];
    var url = "https://api.hsforms.com/submissions/v3/integration/submit/" + payload.portalId + "/" + payload.formGUID
    //
    showLoader();

    $.ajax({
        type: 'POST',
        url: url, // use the form's action attribute as the endpoint
        data: JSON.stringify({
          // "submittedAt": "1517927174000",
          "fields": payload.data,
          "context": {
            // "hutk": document.cookie.hubspotutk, // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
            "pageUri": window.location.hostname + window.location.pathname,
            "pageName": $("#pageName").val()
          },
          "legalConsentOptions":{ // Include this object when GDPR options are enabled
            "consent":{
              "consentToProcess":true,
              "text":"I agree to allow Example Company to store and process my personal data.",
              "communications":[
                {
                  "value":true,
                  "subscriptionTypeId":999,
                  "text":"I agree to receive marketing communications from Example Company."
                }
              ]
            }
          }
        }),
        dataType: "json",
        headers: {
            'Accept': 'application/json', // this makes the server send you a JSON response
            'Content-Type': 'application/json'
        },
        success: function (response) // handle the successful submission of your POST
        {

            $("#hero-2-green").addClass("d-none");
            $("#main-form-container").addClass("d-none");
            $(".form-footer").addClass("d-none");

            $("#thankyoupage").removeClass("d-none");
            var name = "another person";
            for (let index = 0; index < payload.data.length; index++) {
              if(payload.data[index].name == "enter_their_first_and_the_last_name" && payload.data[index].value.length >0){
                name = payload.data[index].value;
              }
            }
            $("#next-form-name").html(name);
            scrollToTop();
            hideLoader();


        },
        error: function (response) {
          hideLoader();
          alert("We get a error, try it again later.");
        }
    });


    function showLoader(){
      $(".loading").addClass("show");
    }

    function hideLoader(){
      $(".loading").removeClass("show");
    }
  }
}
