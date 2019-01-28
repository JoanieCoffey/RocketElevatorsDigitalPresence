var selectElem = document.getElementById('buildingType');

$("#residential").show();
$("#commercial").hide();
$("#corporative").hide();
$("#hybrid").hide();

selectElem.addEventListener('change', function() {
    var index = selectElem.selectedIndex;
    if (index === 0)
    {
        // Show Residential
        $("#residential").show();
        $("#commercial").hide();
        $("#corporative").hide();
        $("#hybrid").hide();
    }
    else if (index === 1)
    {
        // Show Commercial
        $("#residential").hide();
        $("#commercial").show();
        $("#corporative").hide();
        $("#hybrid").hide();
    }
    else if (index === 2)
    {
        // Show Corporative
        $("#residential").hide();
        $("#commercial").hide();
        $("#corporative").show();
        $("#hybrid").hide();
    }
    else if (index === 3)
    {
        // Show Hybrid
        $("#residential").hide();
        $("#commercial").hide();
        $("#corporative").hide();
        $("#hybrid").show();
    }
})

$("#residential input").change(function() {
    residential();
});

$("#commercial input").change(function() {
    commercial();
});

$("#corporative input").change(function() {
    corporative();
});

$("#hybrid input").change(function() {
    hybrid();
});

function residential()
{
    var appartementNumber = $("#residential #appartementNumber").val();
    var floorNumber = $("#residential #floorNumber").val();

    // Combien d'appartements par étage en moyenne
    var moyenneDeAppartementParEtage = appartementNumber / floorNumber;

    // Tout les 6 appartements : 1 cage d'ascenceur
    var elevatorToDeployNumber = Math.ceil(moyenneDeAppartementParEtage / 6);

    // Si il y'a plus de 20 étages, doubler le nombre de cage d'ascenceur
    if (floorNumber > 20)
    {
        elevatorToDeployNumber = elevatorToDeployNumber * 2;
    }

    $("#estimatedElevatorToDeploy").val(elevatorToDeployNumber);
}

function commercial()
{
    // Le nombre de cage d'ascenceur estimé est simplement le même que ce que la personne a écrit.
    var elevatorToDeployNumber = $("#commercial #elevatorToDeployNumber").val();
    $("#estimatedElevatorToDeploy").val(elevatorToDeployNumber);
}

 /* Si le type d’immeuble est Corporatif ou Hybride, on multiplie le nombre d’occupants maximum par étage par 
    le nombre d’étages (incluant le nombre de sous-sols) pour obtenir le nombre d’occupants total.
    Le nombre d'ascenseurs requis est déterminé par le nombre d’occupants divisé par 1000.  
    On divise le nombre d’étages (incluant le nombre de sous-sols) par 20 pour obtenir le nombre de colonnes 
    d'ascenseurs requises. Le nombre total d'ascenseurs est déterminé par le nombre de cages d'ascenseurs 
    multiplié par le nombre de colonnes.
            occupantNumber * (floorNumber + basementNumber) = occupantNumber
            elevatorToDeply =  occupantNumber / 1000
            (floorNumber + basementNumber) /20 = requiredColumn 
            estimatedElevatorToDeploy = elevatorToDeploy * RequiredColumn

    */

function corporative()
{
    var occupantNumber = $("#corporative #occupantNumber").val();
    var floorNumber = $("#corporative #floorNumber").val();
    var basementNumber =$("#corporative #basementNumber").val();

    // On multiplie le nombre d’occupants maximum par étage par le nombre d’étages (incluant le nombre de sous-sols) pour obtenir le nombre d’occupants total.
    var occupantNumberTotal = (basementNumber + floorNumber) * occupantNumber

    // Le nombre d'ascenseurs requis est déterminé par le nombre d’occupants divisé par 1000.
    var elevatorToDeployNumber = Math.ceil (occupantNumberTotal / 1000)

    // On divise le nombre d’étages (incluant le nombre de sous-sols) par 20 pour obtenir le nombre de colonnes
    var requiredColumn = Math.ceil ((basementNumber + floorNumber) / 20)

    //Le nombre total d'ascenseurs est déterminé par le nombre de cages d'ascenseurs multiplié par le nombre de colonnes.
    var estimatedElevatorToDeploy = elevatorToDeployNumber * requiredColumn

    $("#estimatedElevatorToDeploy").val(estimatedElevatorToDeploy);
}

function hybrid()
{
    var occupantNumber = $("#hybrid #occupantNumber").val();
    var floorNumber = $("#hybrid #floorNumber").val();
    var basementNumber =$("#hybrid #basementNumber").val();

    // On multiplie le nombre d’occupants maximum par étage par le nombre d’étages (incluant le nombre de sous-sols) pour obtenir le nombre d’occupants total.
    var occupantNumberTotal = (basementNumber + floorNumber) * occupantNumber

    // Le nombre d'ascenseurs requis est déterminé par le nombre d’occupants divisé par 1000.
    var elevatorToDeployNumber = Math.ceil (occupantNumberTotal / 1000)

    // On divise le nombre d’étages (incluant le nombre de sous-sols) par 20 pour obtenir le nombre de colonnes
    var requiredColumn = Math.ceil ((basementNumber + floorNumber) / 20)

    //Le nombre total d'ascenseurs est déterminé par le nombre de cages d'ascenseurs multiplié par le nombre de colonnes.
    var estimatedElevatorToDeploy = elevatorToDeployNumber * requiredColumn

    $("#estimatedElevatorToDeploy").val(estimatedElevatorToDeploy);
}