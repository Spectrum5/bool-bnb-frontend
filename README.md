## PRIORITA'
Ricerca per Filtri (Localita', Stanze, Letti, Servizi, Raggio entro la localita') manca frontend
Ordine Risultati per Distanza dalla localita'
Autocompletamento Indirizzo Localita'
Immagini in Show ed Edit Apartment

Calcolo Coordinate per Apartment Store // OK
Modale Conferma Apartment Delete // OK
Aggiunta immagini Apartments // OK

Loader Iniziale con Logo
LOADER IMMAGINI CARDS
EFFETTO HOVER CARDS
GESTIRE VISUALIZZAZIONI
MOSTRARE VISUALIZZAZIONI NELLE CARDS
VALIDAZIONI messaggio (compreso tra 10 e 4096 caratteri)
Statistiche (Visualizzazioni)
Inserimento di Sponsorizzazione
Gestione Pagamento
Sidebar Statistiche

## BONUS
Ricerca in Apartment Index
Aggiunta Immagine User
Statistiche (Num. Messaggi ricevuti)

<!-- ------------------------------------------------ -->

<!-- VARIABILE PER HOTEL -->
$hotels = [ 
    ["nome"=> "Hotel Italia",
    "address"=> "Calle Tiepolo 1364, 30125 Venezia VE, Italia",
    "description"=> "Un hotel di charme a Venezia, con camere eleganti e raffinate, arredi antichi e servizi di alto livello, per una vacanza di cultura e arte nel capoluogo veneto."],

    ["nome"=> "Hotel Splendido",
    "address"=> "Sabi Sand Game Reserve, Mpumalanga, Sudafrica",
    "description"=> "Le pittoresche ville di lusso offrono due ville separate, ognuna con una spaziosa camera queen-size e un bagno interno. La vasca da bagno si affaccia sulla splendida catena montuosa della cittadina di campagna. Pittoresco ha un'atmosfera lussuosa ed elegante, oltre a essere un cottage di campagna."],

    ["nome"=> "Casa Paradiso",
    "address"=> "Campo Santa Maria del Giglio, 2467, 30124 Venezia VE, Italia",
    "description" => "Un appartamento rustico in una villa veneziana, con soffitti a volta e mobili antichi, per vivere un'esperienza autentica e genuina della vita del capoluogo veneto."],

    ["nome"=> "Casa Belvedere",
    "address"=> "Salita Baratta, 16, 16034 Portofino GE, Italia",
    "description" => "Una casa di charme nel cuore del centro di Portofino, con camere eleganti e una vista che affaccia sulmare, per un'esperienza di divertimento e storia nella città ligure."],

    ["nome"=> "Casa Excelsior",
    "address"=> "1200 Arch St, Philadelphia, PA 19107, Stati Uniti",
    "description"=> "Una casa di design a Philadelphia, con camere minimaliste e futuriste, dotate di ogni comfort tecnologico, e una posizione strategica per scoprire la vita di questa città negli Stati Uniti."],

    ["nome"=> "Villa Presidential",
    "address"=> "9641 Sunset Blvd, Beverly Hills, CA 90210, Stati Uniti",
    "description"=> "Una villa di lusso sulle colline di Beverly Hills, con una vista mozzafiato sulla città di Los Angeles e una piscina a sfioro per un'esperienza di lusso e comfort nella città del cinema. Questo è in centro a Los Angeles. Tieni presente che ci sarà rumore. C'è traffico, treni, aerei, elicotteri. Sentiti libero di chiedere dei tappi per le orecchie!"],

    ["nome"=> "Hotel Astoria",
    "address"=> "50 Central Park South, New York, NY 10019, Stati Uniti",
    "description" => "Un appartamento di lusso con vista panoramica sulla città di New York, dotato di arredi moderni e tecnologici per un soggiorno confortevole e all'avanguardia."],

    ["nome"=> "Hotel Majestic",
    "address"=> "Peninsula Papagayo, Guanacaste, Costa Rica",
    "description"=> " Hotel composto da una casa moderna che offre una vista imponente dove le montagne raggiungono il mare. Ammira tramonti incredibili e un'abbondanza di fauna selvatica, tra cui pappagalli, scimmie urlatrici e cinguettii di uccelli. La struttura offre un'immersione totale nella foresta circostante."],

    ["nome"=> "Suite Victoria",
    "address"=> "Strand, London WC2R 0EZ, Regno Unito",
    "description" => "La suite si trova all'interno di una classica casa a schiera vittoriana, situata in una posizione tranquilla. Uso delle aree comuni, giardino patio, mangiare in cucina e confortevole soggiorno. Asciugamani e biancheria da letto in dotazione e il bagno ha doccia gel e shampoo per risparmiare sulla vostra confezione. La suite è una base ideale per chi cerca di godersi ed esplorare Londra, e tutti i siti e le attrazioni che ha da offrire!"],

    ["nome"=> "Suite Imperiale",
    "address"=> "Via Ludovisi, 49, 00187 Roma RM, Italia",
    "description"=> "Un hotel di charme nel cuore del centro storico di Roma, con camere eleganti e una vista sulla città vecchia, per un'esperienza di cultura e storia nella città romana."],

    ["nome"=> "Suite Bangkok",
    "address"=> "Khao Rd, Wachira Phayaban, Dusit, Bangkok 10300, Thailandia",
    "description" => "Un bungalow di fronte alla spiaggia a Phuket, con una piscina privata e arredi in stile thailandese, per una vacanza di relax e mare nella paradisiaca isola del Sud Est Asiatico."],

    ["nome"=> "Hotel Vertical",
    "address"=> "West Corniche Road, Abu Dhabi, Emirati Arabi Uniti",
    "description" => "Un appartamento di lusso con vista panoramica sulla città di Abu Dhabi, dotato di arredi moderni e tecnologici per un soggiorno confortevole e all'avanguardia."],

    ["nome"=> "Hotel Universal",
    "address"=> "Av. Malecón de la Reserva 1035, Miraflores, Lima, Perù",
    "description" => "Un bungalow di fronte alla spiaggia a Lima, con una piscina privata e arredi in stile peruviano, per una vacanza di relax e mare nella caratteristica città peruviana."],

    ["nome"=> "Suite Europa",
    "address"=> "Carretera Cancun Tulum Km 62, Playa del Carmen, Q.R., Messico",
    "description" => "Un appartamento sulla spiaggia di Tulum, con una terrazza con vista sull'oceano e una cucina completamente attrezzata per preparare deliziose cene al tramonto."],

    ["nome"=> "Oasis Resort",
    "address"=> "Vommuli Island, Dhaalu Atoll, Maldive",
    "description" => "Una casa vacanze immersa nella natura delle Maldive, con un ampio giardino e una piscina privata per godere della bellezza e della tranquillità dell'isola."],

    ["nome"=> "Suite La Favorita",
    "address"=> "31 Avenue George V, 75008 Paris, Francia",
    "description" => "Una suite boutique nel centro storico di Parigi, con camere eleganti e raffinate, servizi personalizzati e una posizione ideale per esplorare la città."],

    ["nome"=> "Loft di Marè",
    "address"=> "Motu Tehotu BP 547, Bora Bora 98730, Polinesia Francese",
    "description" => "Un loft vacanze immerso nella natura della Polinesia Francese, con un ampio giardino e una piscina privata per godere della bellezza e della tranquillità dell'isola."],

    ["nome"=> "Casa degli Alberi",
    "address"=> "Via Regina, 8, 22019 Tremezzina CO, Italia",,
    "description" => "Un appartamento rustico in una fattoria lombarda, con soffitti a volta e mobili antichi, per vivere un'esperienza autentica e genuina della vita in campagna italiana."],

    ["nome"=> "Appartamento del Vino",
    "address"=> "15 Place Vendôme, 75001 Paris, Francia",
    "description" => "Un appartamento con vista sulla Torre Eiffel a Parigi, con una terrazza privata e un'atmosfera romantica e suggestiva, per un soggiorno indimenticabile nella Ville Lumière."],

    ["nome"=> "Casa del Sole",
    "address"=> "Dock Rd, Victoria & Alfred Waterfront, Cape Town, 8001, Sudafrica",
    "description"=> "Una villa di lusso a CapeTown, circondata da giardini esotici e con una piscina privata, per un soggiorno di relax e benessere nella capitale sudafricana."],

    ["nome"=> "Casa della Montagna",
    "address"=> "Unter den Linden 77, 10117 Berlin, Germania",
    "description"=> "Un casa di design a Berlino, con camere minimaliste e arredate in stile scandinavo, dotate di ogni comfort tecnologico, e una posizione strategica per scoprire la cultura e la vita della capitale tedesca."],

    ["nome"=> "Suite del Giardino",
    "address"=> "Kawasan Pariwisata, Nusa Dua, Lot S6, PO Box 44, Nusa Dua, Bali 80363, Indonesia",
    "description"=> "Una villa di lusso a Bali, circondata da giardini tropicali e con una piscina privata, per un soggiorno di relax e benessere nell'isola indonesiana."],

    ["nome"=> "Loft della Città",
    "address"=> "Via del Babuino, 9, 00187 Roma RM, Italia",
    "description"=> "Un hotel storico nel cuore di Roma, con camere eleganti e classiche, servizi di alta qualità e una posizione privilegiata per scoprire la cultura e l'arte della capitale italiana."],

    ["nome"=> "Mini Appartamento Tiffany",
    "address"=> "768 5th Ave, New York, NY 10019, Stati Uniti",
    "description"=> "Un appartamento moderno a New York, con una vista mozzafiato sulla città e su Cemtral Park, dotato di ogni comfort per un soggiorno di lusso nella città che non dorme mai."],

    ["nome"=> "Appartamento del Parco",
    "address"=> "Kärntner Ring 9, 1010 Wien, Austria",
    "description"=> "Un hotel storico nel cuore di Vienna, con camere eleganti e classiche, servizi di alta qualità e una posizione privilegiata per scoprire la cultura e l'arte della città austriaca."],

    ["nome"=> "Suite Reale 30° Piano",
    "address"=> "Jumeirah St, Umm Suqeim 3, Dubai, Emirati Arabi Uniti",
    "description"=> "Un appartamento moderno a Dubai, con una vista mozzafiato sulla città e sul Burj Khalifa, dotato di ogni comfort per un soggiorno di lusso nell'emirato arabo."],

    ["nome"=> "Loft del Cielo",
    "address"=> "Hong Kong, International Commerce Centre, 1 Austin Road West, Kowloon, Hong Kong",
    "description"=> "Un appartamento moderno a Hong Kong, con una vista panoramica sulla città e una cucina completamente attrezzata, per un soggiorno di lusso nella metropoli cinese."],

    ["nome"=> "Casa della Regina",
    "address"=> "10 Bayfront Avenue, Singapore",
    "description"=> "Un appartamento moderno a Singapore, con una vista panoramica sulla città e una cucina completamente attrezzata, per un soggiorno di lusso nella metropoli asiatica."],

    ["nome"=> "Hotel Savoy",
    "address"=> "1 Rue des Carrieres, Quebec City, QC G1R 4P5, Canada",
    "description"=> "Hotel rustico e accogliente nelle foreste del Canada, con caminetti, vasche idromassaggio e viste panoramiche sui laghi e le montagne circostanti."],

    ["nome"=> "Hotel San Marco",
    "address"=> "Riva degli Schiavoni, 4196, 30122 Venezia VE, Italia",
    "description"=> "Hotel storivo nel cuore di Venezia, con soffitti a volta, mobili antichi e balcone con vista sui monumenti storici e le piazze più famose.],

    ["nome"=> "Suite Royal",
    "address"=> "330 N Wabash Ave, Chicago, IL 60611, Stati Uniti",
    "description"=> "Suite trendy nel cuore di Chicago, con interni moderni, mobili di design e vista sullo skyline di una delle città più famose d'America."],

    ["nome"=> "Hotel Mar Azul",
    "address"=> "Martha Salotti 445, Buenos Aires, Argentina",
    "description"=> "Hotel moderno e confortevole nel quartiere di Palermo a Buenos Aires, con piscina sul tetto e vista sulla città, per un soggiorno di lusso e comfort nella capitale argentina."],

    ["nome"=> "Suite Verde",
    "address"=> "Crescent Rd - Dubai - Emirati Arabi Uniti",
    "description"=> "Suite di lusso a Dubai, con vista sul Burj Khalifa e il mare, arredata con gusto e dotata di tutti i comfort per un soggiorno di lusso negli Emirati Arabi Uniti."],

    ["nome"=> "Riad del Relax",
    "address"=> "Avenue Prince Moulay Rachid, Marrakech 40000, Marocco",
    "description"=> "Riad tradizionale nel centro di Marrakech, con cortili interni, fontane e arredi in stile marocchino, per un'esperienza autentica della cultura e della tradizione marocchina."],

    ["nome"=> "Mini Loft al Mare",
    "address"=> "S.S. Amalfitana, 9, 84011 Amalfi SA, Italia",
    "description"=> "Appartamento in stile mediterraneo sulle coste della Costiera Amalfitana, con vista panoramica sul mare e sulla città, arredato in modo semplice e confortevole per un soggiorno autentico e rilassante."],

    ["nome"=> "Appartamento della Luna",
    "address"=> "Piazza San Giovanni del Toro, 2, 84010 Ravello SA, Italia",
    "description"=> "Appartamenti con vista mozzafiato sulla Costa d'Amalfi a Ravello, arredati con mobili di design e dotati di piscine private e ampi terrazzi, per un soggiorno di lusso nella perla della Costa Amalfitana."],

    ["nome"=> "Panorama Apartments",
    "address"=> "Gotthardstrasse 4, 6490 Andermatt, Svizzera",
    "description" => "Appartamenti di lusso nella città di Andermatt, con vista sulle montagne svizzere e arredi moderni di alta qualità, per un soggiorno di lusso nella Svizzera più cosmopolita."],

    ["nome"=> "Loft del Mare",
    "address"=> "Boulevard J.F. Kennedy, 06600 Antibes, Francia",
    "description" => "Loft di charme nel cuore del centro storico di Antibes, con interni raffinati e una vista panoramica sul Mediterraneo, per un'esperienza autentica della vita francese sulla Costa Azzurra."],

    ["nome"=> "Mini Appartamento del Bosco",
    "address"=> "Baie des Flamands, 97133, Saint Barthélemy",
    "description" => "Ville e case vacanze di lusso sull'isola di Saint Barthélemy, con piscine private, ampi giardini e vista sul mare caraibico, per un soggiorno di relax e benessere nell'isola più esclusiva dei Caraibi."],

    ["nome"=> "Appartamento della Conchiglia",
    "address"=> "Amelia Island, 4750 Amelia Island Pkwy, Amelia Island, FL 32034, Stati Uniti",
    "description" => "Appartamenti eleganti e confortevoli a pochi passi dalle spiagge bianche di Amelia Island, con ampi terrazzi e piscine private, per un soggiorno di lusso sulla costa della Florida."],
]

<!-- DESCRIZIONI PER HOTEL AGGIUNTIVE -->
1. Questo appartamento di lusso ti accoglie con una vista panoramica sulla città e interni arredati con mobili moderni di alta qualità. Dotato di ogni comfort, è il luogo perfetto per un soggiorno di relax e benessere.

2. Immerso nella natura, questa casa vacanza di montagna ti offre un soggiorno accogliente e romantico con interni in legno rustico e camino. Respira l'atmosfera della montagna e goditi il panorama delle cime innevate.

3. Scopri il fascino del passato in questo hotel boutique, arredato con interni in stile coloniale e dotato di una piscina sul tetto con vista panoramica sulla città. Un soggiorno esclusivo e raffinato nel cuore della città.

4. Questo appartamento al mare ti offre un'esperienza autentica con vista sulle onde e arredamento in stile marinaro. Rilassati sulla spiaggia o goditi la vista dal balcone e respira la brezza marina.

5. Scegli la pace e la tranquillità della campagna in questa casa vacanza con interni in pietra e soffitti con travi a vista. Un soggiorno rilassante e rigenerante nella natura, lontano dal caos della città.

6. Questo appartamento moderno con interni minimalisti e terrazza panoramica è la scelta perfetta per un soggiorno di design nel cuore della città. Rilassati dopo una giornata di visite turistiche e goditi la vista dalla terrazza.

7. Vivi l'esperienza della montagna in questo chalet con interni in legno e viste spettacolari sulle cime innevate. Un soggiorno avventuroso e romantico nella natura, lontano dallo stress della città.

8. Questo hotel di charme con arredi in stile boho-chic e giardino privato ti offre un soggiorno di relax e benessere nel cuore della città. Scopri l'atmosfera romantica e rilassante di questo luogo unico.

9. Soggiorna in questo appartamento sul mare con arredamento in stile mediterraneo e vista sulla costa, per un'esperienza autentica e rilassante sulle spiagge più belle. Goditi il mare e la brezza marina in un ambiente confortevole e accogliente.

10. Rilassati e goditi il lusso e il comfort di questa casa vacanza di montagna, con interni moderni e vista sulle cime innevate. Un soggiorno indimenticabile nella natura più incontaminata.