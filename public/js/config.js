var threeDModel = document.getElementById("configViewer");
var currentStatus = "048_Babysitter_Bliss_3DJ_Svartgra";
var mainARStatus =  "048_Babysitter_Bliss_3DJ_Svartgra";

                 threeDModel.src = "https://cdn2.charpstar.net/ConfigFiles/BabyBjornConfigurator/New/Baby.glb";
                    document.getElementById("3DJersey").style.display = "block";
                    document.getElementById("Cotton").style.display = "none";
                    document.getElementById("Balance").style.display = "none";

            function changeModel(x) {
                if (x == "BabyBjorn3D") {
                    threeDModel.src = "https://cdn2.charpstar.net/ConfigFiles/BabyBjornConfigurator/New/Baby.glb";
                    document.getElementById("3DJersey").style.display = "block";
                    document.getElementById("Cotton").style.display = "none";
                    document.getElementById("Balance").style.display = "none";
                   changeMaterial('DGrey', 'darkGreyMesh','048_Babysitter_Bliss_3DJ_Svartgra');

                } else if (x == "babyBjornBliss") {
                    threeDModel.src = "https://cdn2.charpstar.net/ConfigFiles/BabyBjornConfigurator/New/BabyCloth1.glb";
                    document.getElementById("3DJersey").style.display = "none";
                    document.getElementById("Cotton").style.display = "block";
                    document.getElementById("Balance").style.display = "none";
                    changeMaterial('Beige', 'sandGreyBliss','036_Babysitter_Bliss_sandgra');

                } else if (x == "babyBjornBalanceSoft") {
                    threeDModel.src = "https://cdn2.charpstar.net/ConfigFiles/BabyBjornConfigurator/New/BabyBalance3.glb";
                    document.getElementById("3DJersey").style.display = "none";
                    document.getElementById("Cotton").style.display = "none";
                    document.getElementById("Balance").style.display = "block";
                    changeMaterial('Grey', 'morkGraGraBalance','034_Babysitter_Balance_svart_morkgra');
                }

                var btns = document.getElementsByClassName("variantBut");
                for (i = 0; i < btns.length; i++) {
                    btns[i].classList.remove("active");
                }
                document.getElementById(x).className += " active";
            }



    const modelViewerTexture = document.getElementById("configViewer");
                function changeMaterial(x, y, z) {
                let material = modelViewerTexture.model.materials[1];
                modelViewerTexture.variantName = x;

                if (y.includes("Mesh")) {
                    var btns = document.getElementsByClassName("jerseyBut");
                    for (i = 0; i < btns.length; i++) {
                        btns[i].classList.remove("active");
                    }
                    document.getElementById(y).className += " active";
                }

                if (y.includes("Bliss")) {
                    var btns = document.getElementsByClassName("blissBut");
                    for (i = 0; i < btns.length; i++) {
                        btns[i].classList.remove("active");
                    }
                    document.getElementById(y).className += " active";
                }

                if (y.includes("Balance")) {
                    var btns = document.getElementsByClassName("balanceBut");
                    for (i = 0; i < btns.length; i++) {
                        btns[i].classList.remove("active");
                    }
                    document.getElementById(y).className += " active";
                }

                if (z == "050_Babysitter_Bliss_3DJ_Ljusgra") {
                    currentStatus = z;
                    mainARStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/050_Babysitter_Bliss_3DJ_Ljusgra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/050_Babysitter_Bliss_3DJ_Ljusgra.glb");
 
                } else if (z == "048_Babysitter_Bliss_3DJ_Svartgra") {
                     currentStatus = z;
                     mainARStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/048_Babysitter_Bliss_3DJ_Svartgra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/048_Babysitter_Bliss_3DJ_Svartgra.glb");
               
                } else if (z == "049_Babysitter_Bliss_3DJ_Duvbla") {
                     currentStatus = z; 
                     mainARStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/049_Babysitter_Bliss_3DJ_Duvbla.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/049_Babysitter_Bliss_3DJ_Duvbla.glb");
      
                } else if (z == "036_Babysitter_Bliss_sandgra") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/036_Babysitter_Bliss_sandgra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/036_Babysitter_Bliss_sandgra.glb");
            
                } else if (z == "037_Babysitter_Bliss_antikrosa") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/037_Babysitter_Bliss_antikrosa.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/037_Babysitter_Bliss_antikrosa.glb");
        
                } else if (z == "038_Babysitter_Bliss_midnattsbla") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/038_Babysitter_Bliss_midnattsbla.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/038_Babysitter_Bliss_midnattsbla.glb");
       
                } else if (z == "039_Babysitter_Bliss_antracitgra") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/039_Babysitter_Bliss_antracitgra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/039_Babysitter_Bliss_antracitgra.glb");
  
                } else if (z == "040_Babysitter_Bliss") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/040_Babysitter_Bliss.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/040_Babysitter_Bliss.glb");
     
                } else if (z == "Removed041_Babysitter_Bliss_ljusgul") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/Removed041_Babysitter_Bliss_ljusgul.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/Removed041_Babysitter_Bliss_ljusgul.glb");
 
                } else if (z == "034_Babysitter_Balance_svart_morkgra") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/034_Babysitter_Balance_svart_morkgra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/034_Babysitter_Balance_svart_morkgra.glb");
          
                } else if (z == "027_Babysitter_Balance_beige_gra") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/027_Babysitter_Balance_beige_gra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/027_Babysitter_Balance_beige_gra.glb");
              
                } else if (z == "Removed035_Babysitter_Balance_rost_orange") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/Removed035_Babysitter_Balance_rost_orange.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/Removed035_Babysitter_Balance_rost_orange.glb");
       
                } else if (z == "029_Babysitter_Balance_gul_gra") {
                     currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/029_Babysitter_Balance_gul_gra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/029_Babysitter_Balance_gul_gra.glb");
   
                } else if (z == "030_Babysitter_Balance_bla_gra") {
                    currentStatus = z;
                    document.getElementById("arViewer").setAttribute("data-iossrc", "https://bbjorn.charpstar.net/IOS/030_Babysitter_Balance_bla_gra.usdz#allowsContentScaling=0");
                    document.getElementById("arViewer").setAttribute("data-androidsrc", "https://bbjorn.charpstar.net/Android/030_Babysitter_Balance_bla_gra.glb");
 
                }
            }

 