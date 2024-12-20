interface WinEmail {
    issuedToName?: string;
    issuedByName?: string;
    description: string;
    link: string;
}

export const userWinEmail = ({ issuedToName, issuedByName, description, link }: WinEmail) =>
    `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doinfine</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
        rel="stylesheet">

    <style>
        body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: rgb(250, 250, 250);
        }

        nav {
            display: flex;
            align-items: center;
            border-bottom: 0.5px solid rgb(230, 230, 230);
            padding: 0.5rem;
            justify-content: space-between;
            background-color: white;
        }

        nav .logo {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        nav p {
            margin: 0;
        }

        button {
            border: none;
            padding: 5px 10px;
            border-radius: 30px;
        }

        main {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
            padding: 20px;
        }

        main .heading {
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        main .heading * {
            margin: 0;
        }

        main .heading .text {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        main .details {
            background-color: white;
            text-align: center;
            display: flex;
            flex-direction: column;
            border: 1px solid rgb(241, 241, 241);
            min-width: fit-content;
            max-width: 50%;
            padding: 1rem;
            border-radius: 10px;
            margin: auto;
            gap: 10px;
        }

        main .details * {
            margin: 0;
        }

        main button {
            color: white;
            background-color: #C4031A;
            padding: 0.5rem 1rem;
            font-size: 16px;
        }

        main a {
            font-size: 10px;
            color: gray;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <nav>
        <div class="logo">
            <img src="https://fkoctayikdkdvkvhvkds.supabase.co/storage/v1/object/public/social/Logo%20-%20Circle.png"
                width="35px" />
            <p>Doinfine</p>
        </div>
        <a href="https://doinfine.app"><button>Open App</button></a>
    </nav>
    <main>
        <div class="heading roboto-bold">
            <span>🎉</span>
            <div class="text">
                <h4>Horray, ${issuedToName || ""}</h4>
                <h1>You got a win!</h1>
            </div>
        </div>
        <div class="details roboto-light">
            <p>${issuedByName || "Someone"} has awarded you a win for</p>
            <h3>"${description}"</h3>
        </div>
        <a href="${link}"><button class="roboto-regular">Check it out</button></a>
        <a href="https://doinfine.app/me" class="roboto-regular">Edit Preferences</a>
    </main>
</body>

</html>
`;