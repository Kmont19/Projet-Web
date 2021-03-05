<!DOCTYPE html>
<html lang="fr">
    <head>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <title>Departement Informatique Cegep T-R</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">                   
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">     
        <link rel="stylesheet" type="text/css" href="actualite_admin.css"/>
        <link rel="stylesheet" type="text/css" href="/SERVEUR_YAN/Projet_Web/Menu/menu.css"/> 
        <script src="actualite_admin.js"></script>
        
    </head>
   


    <body>
        <div id="menu">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-auto">
                        <div class="bloc-logo">
                            <a href="../index.html">
                                <img src="/SERVEUR_YAN/Projet_Web/Images/Logo-Cegep.jpg" alt="Logo" id="logo">
                            </a>
                        </div>
                    </div>
                    <div class="col" id="titre">
                        <div class="row justify-content-center">
                            <h1>Département d'informatique</h1>
                        </div>
                            <ul class="nav nav-pills nav-fill justify-content-center">
                                <li class="nav-item">
                                    <a class="nav-link" id="Accueil" href="../index.html">Accueil</a>  
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" id="programme">Programme</a>
                                    <div class="dropdown-menu" aria-labelledby="programme">
                                        <a href="#" class="dropdown-item" id="cours">Cours</a>
                                        <a href="#" class="dropdown-item" id="equipe">Équipe</a>
                                    </div>   
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="actualite" href="Actualite/actualite.html">Actualité</a>    
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="liens-utiles">Liens Utiles</a> 
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="evenement"  href="../Evenement/evenement.html">Évènements</a> 
                                </li>
                            </ul>            
                    </div>                
                </div>
            </div>   
        </div>

        

        <div class="bloc-corps">
            <h1>Administration des actualités</h1>
            <section id="ctnAdminActu">


                <section id="adminRechActu">

                    <div id="ctnRechActu" class="input-group">

                        <div class="input-group-prepend ddwRechActu" id="ddwRechActu">
                           <select  type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" id="dpdTypeRequete">                         
                                <div class="dropdown-menu">
                                    <option  class="dropdown-item" selected disabled>Recherche Par</a>
                                    <option  class="dropdown-item" value="titre">Titre</a>
                                    <option  class="dropdown-item" value="categorie">Catégorie</a>
                                    <option  class="dropdown-item" value="autre">Autre</a>
                                    <option  class="dropdown-item" value="aucun">Aucun</a>
                                </div>
                            </select >
                        </div> 
                        <div class="input-group mb-3" id="barreRechActu">
                            <input type="search" class="form-control" id="champRechActu" placeholder="Recherche">
                            <div class="input-group-append">
                               <!-- <button class="btn btn-success" id="btnRechActu" type="submit">OK</button>-->
                                <button class="btn btn-success" data-toggle = "modal" data-target="#adminFormActu" >OK</button>
                            </div>
                        </div>
                    </div>
                  
                    <div id="ctntblActu" class="col-lg-12 container border">
                       
                            <table class="table table-hover" id="tblActu">
                                <thead  class="bg-info">
                                <tr>
                                    <th>Titre</th>
                                    <th>Date</th>
                                    <th>Catégorie</th>
                                </tr>
                                </thead>
                                <tbody id="corpsTabActu">
                            
                                </tbody>
                            </table>
                    </div>


                  
                </section>
                <div id="ctnBtnModalAjoutActu">
                    <div class="input-group-append btnFormAdminActualite">
                        <button class="btn btn-primary" id="BtnModalAjoutActu" type="button"  data-toggle="modal" data-target= "#adminFormActu" onclick="ModaleAjout()">Ajouter une actualité</button>
                    </div>
                    
                </div> 
               
            </section>




            <section class="modal modal fade " id="adminFormActu">

                <div class="modal-dialog modal-lg modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Formulaire Actualité</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        <form  class="modal-body" id="frmAdminActualite" method="post" enctype="multipart/form-data">
                                    <div class="input-group mb-3 ctnInput" id="divTitreActu">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info" style="color: white;">Titre</span>
                                        </div>                     
                                        <input type="text" class="form-control" placeholder="Titre de l'actualité" id="titreActu">
                                    </div>
                                    <div class="input-group mb-3 ctnInput" id="divDateActu">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info" style="color: white;">Date</span>
                                        </div>    
                                        <input type="date" class="form-control" placeholder="Date de l'actualité" id="dateActu">
                                    </div>                           
                                    <div class="input-group mb-3 ctnInput" id="divTexteActu">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text bg-info" style="color: white;">Texte</span>
                                        </div>    
                                        <textarea class="form-control" rows="5"  placeholder="Texte de l'actualité" id="texteActu"></textarea>
                                    </div>                           
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                        <span class="input-group-text bg-info" id="btnTelecharger" style="color: white;">Télécharger</span>
                                        </div>
                                        <div class="custom-file mb-3">
                                        <input type="file" class="custom-file-input" id="imageActu">
                                            <label class="custom-file-label" for="imageActu">Image de l'actualité:</label>                             
                                        </div>
                                    </div>    
                                    <div id="ctnBtnActu">
                                        <div class="input-group-append btnFormAdminActu">
                                            <button class="btn btn-primary" id="btnAjoutActu" type="button">Ajouter</button>
                                        </div>
                                        <div class="input-group-append btnFormAdminActu">
                                            <button class="btn btn-primary" id="btnModifActu" type="button">Modifier</button>
                                        </div>
                                        <div class="input-group-append btnFormAdminActu">
                                            <button class="btn btn-danger" id="btnSupprimerActu" type="button">Supprimer</button>
                                        </div>
                                        <div class="input-group-append btnFormAdminActu">
                                            <button class="btn btn-primary" id="btnAnnulerActu" type="button">Annuler</button>
                                        </div>
                                    </div> 
                        </form>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-success" data-dismiss="modal">Fermer</button>
                        </div>
                    </div>
                </div>
            </section>


        </div>

    </body>

    <script>

        $(".custom-file-input").on("change", function() {
        var fileName = $(this).val().split("\\").pop();
        $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });

     
		
    </script>
</html>

