-- Tables
CREATE TABLE userinfo(
    userid varchar(20),
    username varchar(64),
    password varchar(64),
    email varchar(64),
    latitude double,
    longitude double
);
CREATE TABLE products(
    productid varchar(20),
    userid varchar(15),
    productname varchar(100),
    description text,
    price float,
    condition tinyint(1),
    status tinyint(1),
    category varchar(35),
    latitude double,
    longitude double
);
CREATE TABLE tags(
    productid varchar(15),
    tag varchar(20)
);
drop table purchase;
CREATE TABLE purchase(
    productid varchar(20),
    date DATE
);

drop table wishlist;
CREATE TABLE wishlist(
    userid varchar(20),
    keyword varchar(30),
    CONSTRAINT PRIMARY KEY (userid, keyword)
);

CREATE TABLE notification(
    userid varchar(20),
    message varchar(50)
);

create table topsearch (
  userid varchar(20),
  keyword text,
  timerecord timestamp
);

create table likes (
  userid varchar(20),
  productid varchar(20)
);

drop table purchase;
CREATE TABLE purchase(
    userid varchar(20),
    productid varchar(20),
    date DATE,
    price float
);
insert into purchase values(1694360670575, 1694368553392, '2023-11-6', 412);
insert into purchase values(1694360670575, 1694368554392, '2023-11-6', 450);
insert into purchase values(1694360670575, 1694368556392, '2023-11-6', 600);
insert into purchase values(1694360670575, 1694368553392, '2023-11-23', 499);
insert into purchase values(1694360670575, 1694368453392, '2023-11-15', 330);
insert into purchase values(1694360670575, 1694368556392, '2023-11-10', 900);
insert into purchase values(1694360670575, 1694368553392, '2023-11-8', 120);
insert into purchase values(1694360670575, 1694368353392, '2023-11-8', 620);
insert into purchase values(1694360670575, 1694373553392, '2023-11-5', 400);

-- Districts 
INSERT INTO districts VALUES('Chattagram', 'Cumilla');
INSERT INTO districts VALUES('Chattagram', 'Feni');
INSERT INTO districts VALUES('Chattagram', 'Brahmanbaria');
INSERT INTO districts VALUES('Chattagram', 'Rangamati');
INSERT INTO districts VALUES('Chattagram', 'Noakhali');
INSERT INTO districts VALUES('Chattagram', 'Chandpur');
INSERT INTO districts VALUES('Chattagram', 'Lakshmipur');
INSERT INTO districts VALUES('Chattagram', 'Chattogram');
INSERT INTO districts VALUES('Chattagram', 'Coxsbazar');
INSERT INTO districts VALUES('Chattagram', 'Khagrachhari');
INSERT INTO districts VALUES('Chattagram', 'Bandarban');
INSERT INTO districts VALUES('Rajshahi', 'Sirajganj');
INSERT INTO districts VALUES('Rajshahi', 'Pabna');
INSERT INTO districts VALUES('Rajshahi', 'Bogura');
INSERT INTO districts VALUES('Rajshahi', 'Rajshahi');
INSERT INTO districts VALUES('Rajshahi', 'Natore');
INSERT INTO districts VALUES('Rajshahi', 'Joypurhat');
INSERT INTO districts VALUES('Rajshahi', 'Chapainawabganj');
INSERT INTO districts VALUES('Rajshahi', 'Naogaon');
INSERT INTO districts VALUES('Khulna', 'Jashore');
INSERT INTO districts VALUES('Khulna', 'Satkhira');
INSERT INTO districts VALUES('Khulna', 'Meherpur');
INSERT INTO districts VALUES('Khulna', 'Narail');
INSERT INTO districts VALUES('Khulna', 'Chuadanga');
INSERT INTO districts VALUES('Khulna', 'Kushtia');
INSERT INTO districts VALUES('Khulna', 'Magura');
INSERT INTO districts VALUES('Khulna', 'Khulna');
INSERT INTO districts VALUES('Khulna', 'Bagerhat');
INSERT INTO districts VALUES('Khulna', 'Jhenaidah');
INSERT INTO districts VALUES('Barisal', 'Jhalakathi');
INSERT INTO districts VALUES('Barisal', 'Patuakhali');
INSERT INTO districts VALUES('Barisal', 'Pirojpur');
INSERT INTO districts VALUES('Barisal', 'Barisal');
INSERT INTO districts VALUES('Barisal', 'Bhola');
INSERT INTO districts VALUES('Barisal', 'Barguna');
INSERT INTO districts VALUES('Sylhet', 'Sylhet');
INSERT INTO districts VALUES('Sylhet', 'Moulvibazar');
INSERT INTO districts VALUES('Sylhet', 'Habiganj');
INSERT INTO districts VALUES('Sylhet', 'Sunamganj');
INSERT INTO districts VALUES('Dhaka', 'Narsingdi');
INSERT INTO districts VALUES('Dhaka', 'Gazipur');
INSERT INTO districts VALUES('Dhaka', 'Shariatpur');
INSERT INTO districts VALUES('Dhaka', 'Narayanganj');
INSERT INTO districts VALUES('Dhaka', 'Tangail');
INSERT INTO districts VALUES('Dhaka', 'Kishoreganj');
INSERT INTO districts VALUES('Dhaka', 'Manikganj');
INSERT INTO districts VALUES('Dhaka', 'Dhaka');
INSERT INTO districts VALUES('Dhaka', 'Munshiganj');
INSERT INTO districts VALUES('Dhaka', 'Rajbari');
INSERT INTO districts VALUES('Dhaka', 'Madaripur');
INSERT INTO districts VALUES('Dhaka', 'Gopalganj');
INSERT INTO districts VALUES('Dhaka', 'Faridpur');
INSERT INTO districts VALUES('Rangpur', 'Panchagarh');
INSERT INTO districts VALUES('Rangpur', 'Dinajpur');
INSERT INTO districts VALUES('Rangpur', 'Lalmonirhat');
INSERT INTO districts VALUES('Rangpur', 'Nilphamari');
INSERT INTO districts VALUES('Rangpur', 'Gaibandha');
INSERT INTO districts VALUES('Rangpur', 'Thakurgaon');
INSERT INTO districts VALUES('Rangpur', 'Rangpur');
INSERT INTO districts VALUES('Rangpur', 'Kurigram');
INSERT INTO districts VALUES('Mymensingh', 'Sherpur');
INSERT INTO districts VALUES('Mymensingh', 'Mymensingh');
INSERT INTO districts VALUES('Mymensingh', 'Jamalpur');
INSERT INTO districts VALUES('Mymensingh', 'Netrokona');

-- Subdistrict
INSERT INTO subdistricts VALUES('Cumilla', 'Debidwar');
INSERT INTO subdistricts VALUES('Cumilla', 'Barura');
INSERT INTO subdistricts VALUES('Cumilla', 'Brahmanpara');
INSERT INTO subdistricts VALUES('Cumilla', 'Chandina');
INSERT INTO subdistricts VALUES('Cumilla', 'Chauddagram');
INSERT INTO subdistricts VALUES('Cumilla', 'Daudkandi');
INSERT INTO subdistricts VALUES('Cumilla', 'Homna');
INSERT INTO subdistricts VALUES('Cumilla', 'Laksam');
INSERT INTO subdistricts VALUES('Cumilla', 'Muradnagar');
INSERT INTO subdistricts VALUES('Cumilla', 'Nangalkot');
INSERT INTO subdistricts VALUES('Cumilla', 'Comilla-Sadar');
INSERT INTO subdistricts VALUES('Cumilla', 'Meghna');
INSERT INTO subdistricts VALUES('Cumilla', 'Monohargonj');
INSERT INTO subdistricts VALUES('Cumilla', 'Sadarsouth');
INSERT INTO subdistricts VALUES('Cumilla', 'Titas');
INSERT INTO subdistricts VALUES('Cumilla', 'Burichang');
INSERT INTO subdistricts VALUES('Cumilla', 'Lalmai');
INSERT INTO subdistricts VALUES('Feni', 'Chhagalnaiya');
INSERT INTO subdistricts VALUES('Feni', 'Feni-Sadar');
INSERT INTO subdistricts VALUES('Feni', 'Sonagazi');
INSERT INTO subdistricts VALUES('Feni', 'Fulgazi');
INSERT INTO subdistricts VALUES('Feni', 'Parshuram');
INSERT INTO subdistricts VALUES('Feni', 'Daganbhuiyan');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Brahmanbaria-Sadar');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Kasba');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Nasirnagar');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Sarail');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Ashuganj');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Akhaura');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Nabinagar');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Bancharampur');
INSERT INTO subdistricts VALUES('Brahmanbaria', 'Bijoynagar');
INSERT INTO subdistricts VALUES('Rangamati', 'Rangamati-Sadar');
INSERT INTO subdistricts VALUES('Rangamati', 'Kaptai');
INSERT INTO subdistricts VALUES('Rangamati', 'Kawkhali');
INSERT INTO subdistricts VALUES('Rangamati', 'Baghaichari');
INSERT INTO subdistricts VALUES('Rangamati', 'Barkal');
INSERT INTO subdistricts VALUES('Rangamati', 'Langadu');
INSERT INTO subdistricts VALUES('Rangamati', 'Rajasthali');
INSERT INTO subdistricts VALUES('Rangamati', 'Belaichari');
INSERT INTO subdistricts VALUES('Rangamati', 'Juraichari');
INSERT INTO subdistricts VALUES('Rangamati', 'Naniarchar');
INSERT INTO subdistricts VALUES('Noakhali', 'Noakhali-Sadar');
INSERT INTO subdistricts VALUES('Noakhali', 'Companiganj');
INSERT INTO subdistricts VALUES('Noakhali', 'Begumganj');
INSERT INTO subdistricts VALUES('Noakhali', 'Hatia');
INSERT INTO subdistricts VALUES('Noakhali', 'Subarnachar');
INSERT INTO subdistricts VALUES('Noakhali', 'Kabirhat');
INSERT INTO subdistricts VALUES('Noakhali', 'Senbug');
INSERT INTO subdistricts VALUES('Noakhali', 'Chatkhil');
INSERT INTO subdistricts VALUES('Noakhali', 'Sonaimori');
INSERT INTO subdistricts VALUES('Chandpur', 'Haimchar');
INSERT INTO subdistricts VALUES('Chandpur', 'Kachua');
INSERT INTO subdistricts VALUES('Chandpur', 'Shahrasti');
INSERT INTO subdistricts VALUES('Chandpur', 'Chandpur-Sadar');
INSERT INTO subdistricts VALUES('Chandpur', 'Matlab-South');
INSERT INTO subdistricts VALUES('Chandpur', 'Hajiganj');
INSERT INTO subdistricts VALUES('Chandpur', 'Matlab-North');
INSERT INTO subdistricts VALUES('Chandpur', 'Faridgonj');
INSERT INTO subdistricts VALUES('Lakshmipur', 'Lakshmipur-Sadar');
INSERT INTO subdistricts VALUES('Lakshmipur', 'Kamalnagar');
INSERT INTO subdistricts VALUES('Lakshmipur', 'Raipur');
INSERT INTO subdistricts VALUES('Lakshmipur', 'Ramgati');
INSERT INTO subdistricts VALUES('Lakshmipur', 'Ramganj');
INSERT INTO subdistricts VALUES('Chattogram', 'Rangunia');
INSERT INTO subdistricts VALUES('Chattogram', 'Sitakunda');
INSERT INTO subdistricts VALUES('Chattogram', 'Mirsharai');
INSERT INTO subdistricts VALUES('Chattogram', 'Patiya');
INSERT INTO subdistricts VALUES('Chattogram', 'Sandwip');
INSERT INTO subdistricts VALUES('Chattogram', 'Banshkhali');
INSERT INTO subdistricts VALUES('Chattogram', 'Boalkhali');
INSERT INTO subdistricts VALUES('Chattogram', 'Anwara');
INSERT INTO subdistricts VALUES('Chattogram', 'Chandanaish');
INSERT INTO subdistricts VALUES('Chattogram', 'Satkania');
INSERT INTO subdistricts VALUES('Chattogram', 'Lohagara');
INSERT INTO subdistricts VALUES('Chattogram', 'Hathazari');
INSERT INTO subdistricts VALUES('Chattogram', 'Fatikchhari');
INSERT INTO subdistricts VALUES('Chattogram', 'Raozan');
INSERT INTO subdistricts VALUES('Chattogram', 'Karnafuli');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Coxsbazar-Sadar');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Chakaria');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Kutubdia');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Ukhiya');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Moheshkhali');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Pekua');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Ramu');
INSERT INTO subdistricts VALUES('Coxsbazar', 'Teknaf');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Khagrachhari-Sadar');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Dighinala');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Panchari');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Laxmichhari');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Mohalchari');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Manikchari');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Ramgarh');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Matiranga');
INSERT INTO subdistricts VALUES('Khagrachhari', 'Guimara');
INSERT INTO subdistricts VALUES('Bandarban', 'Bandarban-Sadar');
INSERT INTO subdistricts VALUES('Bandarban', 'Alikadam');
INSERT INTO subdistricts VALUES('Bandarban', 'Naikhongchhari');
INSERT INTO subdistricts VALUES('Bandarban', 'Rowangchhari');
INSERT INTO subdistricts VALUES('Bandarban', 'Lama');
INSERT INTO subdistricts VALUES('Bandarban', 'Ruma');
INSERT INTO subdistricts VALUES('Bandarban', 'Thanchi');
INSERT INTO subdistricts VALUES('Sirajganj', 'Belkuchi');
INSERT INTO subdistricts VALUES('Sirajganj', 'Chauhali');
INSERT INTO subdistricts VALUES('Sirajganj', 'Kamarkhand');
INSERT INTO subdistricts VALUES('Sirajganj', 'Kazipur');
INSERT INTO subdistricts VALUES('Sirajganj', 'Raigonj');
INSERT INTO subdistricts VALUES('Sirajganj', 'Shahjadpur');
INSERT INTO subdistricts VALUES('Sirajganj', 'Sirajganj-Sadar');
INSERT INTO subdistricts VALUES('Sirajganj', 'Tarash');
INSERT INTO subdistricts VALUES('Sirajganj', 'Ullapara');
INSERT INTO subdistricts VALUES('Pabna', 'Sujanagar');
INSERT INTO subdistricts VALUES('Pabna', 'Ishurdi');
INSERT INTO subdistricts VALUES('Pabna', 'Bhangura');
INSERT INTO subdistricts VALUES('Pabna', 'Pabna-Sadar');
INSERT INTO subdistricts VALUES('Pabna', 'Bera');
INSERT INTO subdistricts VALUES('Pabna', 'Atghoria');
INSERT INTO subdistricts VALUES('Pabna', 'Chatmohar');
INSERT INTO subdistricts VALUES('Pabna', 'Santhia');
INSERT INTO subdistricts VALUES('Pabna', 'Faridpur');
INSERT INTO subdistricts VALUES('Bogura', 'Kahaloo');
INSERT INTO subdistricts VALUES('Bogura', 'Bogra-Sadar');
INSERT INTO subdistricts VALUES('Bogura', 'Shariakandi');
INSERT INTO subdistricts VALUES('Bogura', 'Shajahanpur');
INSERT INTO subdistricts VALUES('Bogura', 'Dupchanchia');
INSERT INTO subdistricts VALUES('Bogura', 'Adamdighi');
INSERT INTO subdistricts VALUES('Bogura', 'Nondigram');
INSERT INTO subdistricts VALUES('Bogura', 'Sonatala');
INSERT INTO subdistricts VALUES('Bogura', 'Dhunot');
INSERT INTO subdistricts VALUES('Bogura', 'Gabtali');
INSERT INTO subdistricts VALUES('Bogura', 'Sherpur');
INSERT INTO subdistricts VALUES('Bogura', 'Shibganj');
INSERT INTO subdistricts VALUES('Rajshahi', 'Paba');
INSERT INTO subdistricts VALUES('Rajshahi', 'Durgapur');
INSERT INTO subdistricts VALUES('Rajshahi', 'Mohonpur');
INSERT INTO subdistricts VALUES('Rajshahi', 'Charghat');
INSERT INTO subdistricts VALUES('Rajshahi', 'Puthia');
INSERT INTO subdistricts VALUES('Rajshahi', 'Bagha');
INSERT INTO subdistricts VALUES('Rajshahi', 'Godagari');
INSERT INTO subdistricts VALUES('Rajshahi', 'Tanore');
INSERT INTO subdistricts VALUES('Rajshahi', 'Bagmara');
INSERT INTO subdistricts VALUES('Natore', 'Natore-Sadar');
INSERT INTO subdistricts VALUES('Natore', 'Singra');
INSERT INTO subdistricts VALUES('Natore', 'Baraigram');
INSERT INTO subdistricts VALUES('Natore', 'Bagatipara');
INSERT INTO subdistricts VALUES('Natore', 'Lalpur');
INSERT INTO subdistricts VALUES('Natore', 'Gurudaspur');
INSERT INTO subdistricts VALUES('Natore', 'Naldanga');
INSERT INTO subdistricts VALUES('Joypurhat', 'Akkelpur');
INSERT INTO subdistricts VALUES('Joypurhat', 'Kalai');
INSERT INTO subdistricts VALUES('Joypurhat', 'Khetlal');
INSERT INTO subdistricts VALUES('Joypurhat', 'Panchbibi');
INSERT INTO subdistricts VALUES('Joypurhat', 'Joypurhat-Sadar');
INSERT INTO subdistricts VALUES('Chapainawabganj', 'Chapainawabganj-Sadar');
INSERT INTO subdistricts VALUES('Chapainawabganj', 'Gomostapur');
INSERT INTO subdistricts VALUES('Chapainawabganj', 'Nachol');
INSERT INTO subdistricts VALUES('Chapainawabganj', 'Bholahat');
INSERT INTO subdistricts VALUES('Chapainawabganj', 'Shibganj');
INSERT INTO subdistricts VALUES('Naogaon', 'Mohadevpur');
INSERT INTO subdistricts VALUES('Naogaon', 'Badalgachi');
INSERT INTO subdistricts VALUES('Naogaon', 'Patnitala');
INSERT INTO subdistricts VALUES('Naogaon', 'Dhamoirhat');
INSERT INTO subdistricts VALUES('Naogaon', 'Niamatpur');
INSERT INTO subdistricts VALUES('Naogaon', 'Manda');
INSERT INTO subdistricts VALUES('Naogaon', 'Atrai');
INSERT INTO subdistricts VALUES('Naogaon', 'Raninagar');
INSERT INTO subdistricts VALUES('Naogaon', 'Naogaon-Sadar');
INSERT INTO subdistricts VALUES('Naogaon', 'Porsha');
INSERT INTO subdistricts VALUES('Naogaon', 'Sapahar');
INSERT INTO subdistricts VALUES('Jashore', 'Manirampur');
INSERT INTO subdistricts VALUES('Jashore', 'Abhaynagar');
INSERT INTO subdistricts VALUES('Jashore', 'Bagherpara');
INSERT INTO subdistricts VALUES('Jashore', 'Chougachha');
INSERT INTO subdistricts VALUES('Jashore', 'Jhikargacha');
INSERT INTO subdistricts VALUES('Jashore', 'Keshabpur');
INSERT INTO subdistricts VALUES('Jashore', 'Jessore-Sadar');
INSERT INTO subdistricts VALUES('Jashore', 'Sharsha');
INSERT INTO subdistricts VALUES('Satkhira', 'Assasuni');
INSERT INTO subdistricts VALUES('Satkhira', 'Debhata');
INSERT INTO subdistricts VALUES('Satkhira', 'Kalaroa');
INSERT INTO subdistricts VALUES('Satkhira', 'Satkhira-Sadar');
INSERT INTO subdistricts VALUES('Satkhira', 'Shyamnagar');
INSERT INTO subdistricts VALUES('Satkhira', 'Tala');
INSERT INTO subdistricts VALUES('Satkhira', 'Kaliganj');
INSERT INTO subdistricts VALUES('Meherpur', 'Mujibnagar');
INSERT INTO subdistricts VALUES('Meherpur', 'Meherpur-Sadar');
INSERT INTO subdistricts VALUES('Meherpur', 'Gangni');
INSERT INTO subdistricts VALUES('Narail', 'Narail-Sadar');
INSERT INTO subdistricts VALUES('Narail', 'Lohagara');
INSERT INTO subdistricts VALUES('Narail', 'Kalia');
INSERT INTO subdistricts VALUES('Chuadanga', 'Chuadanga-Sadar');
INSERT INTO subdistricts VALUES('Chuadanga', 'Alamdanga');
INSERT INTO subdistricts VALUES('Chuadanga', 'Damurhuda');
INSERT INTO subdistricts VALUES('Chuadanga', 'Jibannagar');
INSERT INTO subdistricts VALUES('Kushtia', 'Kushtia-Sadar');
INSERT INTO subdistricts VALUES('Kushtia', 'Kumarkhali');
INSERT INTO subdistricts VALUES('Kushtia', 'Khoksa');
INSERT INTO subdistricts VALUES('Kushtia', 'Mirpur');
INSERT INTO subdistricts VALUES('Kushtia', 'Daulatpur');
INSERT INTO subdistricts VALUES('Kushtia', 'Bheramara');
INSERT INTO subdistricts VALUES('Magura', 'Shalikha');
INSERT INTO subdistricts VALUES('Magura', 'Sreepur');
INSERT INTO subdistricts VALUES('Magura', 'Magura-Sadar');
INSERT INTO subdistricts VALUES('Magura', 'Mohammadpur');
INSERT INTO subdistricts VALUES('Khulna', 'Paikgasa');
INSERT INTO subdistricts VALUES('Khulna', 'Fultola');
INSERT INTO subdistricts VALUES('Khulna', 'Digholia');
INSERT INTO subdistricts VALUES('Khulna', 'Rupsha');
INSERT INTO subdistricts VALUES('Khulna', 'Terokhada');
INSERT INTO subdistricts VALUES('Khulna', 'Dumuria');
INSERT INTO subdistricts VALUES('Khulna', 'Botiaghata');
INSERT INTO subdistricts VALUES('Khulna', 'Dakop');
INSERT INTO subdistricts VALUES('Khulna', 'Koyra');
INSERT INTO subdistricts VALUES('Bagerhat', 'Fakirhat');
INSERT INTO subdistricts VALUES('Bagerhat', 'Bagerhat-Sadar');
INSERT INTO subdistricts VALUES('Bagerhat', 'Mollahat');
INSERT INTO subdistricts VALUES('Bagerhat', 'Sarankhola');
INSERT INTO subdistricts VALUES('Bagerhat', 'Rampal');
INSERT INTO subdistricts VALUES('Bagerhat', 'Morrelganj');
INSERT INTO subdistricts VALUES('Bagerhat', 'Kachua');
INSERT INTO subdistricts VALUES('Bagerhat', 'Mongla');
INSERT INTO subdistricts VALUES('Bagerhat', 'Chitalmari');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Jhenaidah-Sadar');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Shailkupa');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Harinakundu');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Kaliganj');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Kotchandpur');
INSERT INTO subdistricts VALUES('Jhenaidah', 'Moheshpur');
INSERT INTO subdistricts VALUES('Jhalakathi', 'Jhalakathi-Sadar');
INSERT INTO subdistricts VALUES('Jhalakathi', 'Kathalia');
INSERT INTO subdistricts VALUES('Jhalakathi', 'Nalchity');
INSERT INTO subdistricts VALUES('Jhalakathi', 'Rajapur');
INSERT INTO subdistricts VALUES('Patuakhali', 'Bauphal');
INSERT INTO subdistricts VALUES('Patuakhali', 'Patuakhali-Sadar');
INSERT INTO subdistricts VALUES('Patuakhali', 'Dumki');
INSERT INTO subdistricts VALUES('Patuakhali', 'Dashmina');
INSERT INTO subdistricts VALUES('Patuakhali', 'Kalapara');
INSERT INTO subdistricts VALUES('Patuakhali', 'Mirzaganj');
INSERT INTO subdistricts VALUES('Patuakhali', 'Galachipa');
INSERT INTO subdistricts VALUES('Patuakhali', 'Rangabali');
INSERT INTO subdistricts VALUES('Pirojpur', 'Pirojpur-Sadar');
INSERT INTO subdistricts VALUES('Pirojpur', 'Nazirpur');
INSERT INTO subdistricts VALUES('Pirojpur', 'Kawkhali');
INSERT INTO subdistricts VALUES('Pirojpur', 'Zianagar');
INSERT INTO subdistricts VALUES('Pirojpur', 'Bhandaria');
INSERT INTO subdistricts VALUES('Pirojpur', 'Mathbaria');
INSERT INTO subdistricts VALUES('Pirojpur', 'Nesarabad');
INSERT INTO subdistricts VALUES('Barisal', 'Barisal-Sadar');
INSERT INTO subdistricts VALUES('Barisal', 'Bakerganj');
INSERT INTO subdistricts VALUES('Barisal', 'Babuganj');
INSERT INTO subdistricts VALUES('Barisal', 'Wazirpur');
INSERT INTO subdistricts VALUES('Barisal', 'Banaripara');
INSERT INTO subdistricts VALUES('Barisal', 'Gournadi');
INSERT INTO subdistricts VALUES('Barisal', 'Agailjhara');
INSERT INTO subdistricts VALUES('Barisal', 'Mehendiganj');
INSERT INTO subdistricts VALUES('Barisal', 'Muladi');
INSERT INTO subdistricts VALUES('Barisal', 'Hizla');
INSERT INTO subdistricts VALUES('Bhola', 'Bhola-Sadar');
INSERT INTO subdistricts VALUES('Bhola', 'Borhan-Sddin');
INSERT INTO subdistricts VALUES('Bhola', 'Charfesson');
INSERT INTO subdistricts VALUES('Bhola', 'Doulatkhan');
INSERT INTO subdistricts VALUES('Bhola', 'Monpura');
INSERT INTO subdistricts VALUES('Bhola', 'Tazumuddin');
INSERT INTO subdistricts VALUES('Bhola', 'Lalmohan');
INSERT INTO subdistricts VALUES('Barguna', 'Amtali');
INSERT INTO subdistricts VALUES('Barguna', 'Barguna-Sadar');
INSERT INTO subdistricts VALUES('Barguna', 'Betagi');
INSERT INTO subdistricts VALUES('Barguna', 'Bamna');
INSERT INTO subdistricts VALUES('Barguna', 'Pathorghata');
INSERT INTO subdistricts VALUES('Barguna', 'Taltali');
INSERT INTO subdistricts VALUES('Sylhet', 'Balaganj');
INSERT INTO subdistricts VALUES('Sylhet', 'Beanibazar');
INSERT INTO subdistricts VALUES('Sylhet', 'Bishwanath');
INSERT INTO subdistricts VALUES('Sylhet', 'Companiganj');
INSERT INTO subdistricts VALUES('Sylhet', 'Fenchuganj');
INSERT INTO subdistricts VALUES('Sylhet', 'Golapganj');
INSERT INTO subdistricts VALUES('Sylhet', 'Gowainghat');
INSERT INTO subdistricts VALUES('Sylhet', 'Jaintiapur');
INSERT INTO subdistricts VALUES('Sylhet', 'Kanaighat');
INSERT INTO subdistricts VALUES('Sylhet', 'Sylhet-Sadar');
INSERT INTO subdistricts VALUES('Sylhet', 'Zakiganj');
INSERT INTO subdistricts VALUES('Sylhet', 'Dakshinsurma');
INSERT INTO subdistricts VALUES('Sylhet', 'Osmaninagar');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Barlekha');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Kamolganj');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Kulaura');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Moulvibazar-Sadar');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Rajnagar');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Sreemangal');
INSERT INTO subdistricts VALUES('Moulvibazar', 'Juri');
INSERT INTO subdistricts VALUES('Habiganj', 'Nabiganj');
INSERT INTO subdistricts VALUES('Habiganj', 'Bahubal');
INSERT INTO subdistricts VALUES('Habiganj', 'Ajmiriganj');
INSERT INTO subdistricts VALUES('Habiganj', 'Baniachong');
INSERT INTO subdistricts VALUES('Habiganj', 'Lakhai');
INSERT INTO subdistricts VALUES('Habiganj', 'Chunarughat');
INSERT INTO subdistricts VALUES('Habiganj', 'Habiganj-Sadar');
INSERT INTO subdistricts VALUES('Habiganj', 'Madhabpur');
INSERT INTO subdistricts VALUES('Sunamganj', 'Sunamganj-Sadar');
INSERT INTO subdistricts VALUES('Sunamganj', 'South-Sunamganj');
INSERT INTO subdistricts VALUES('Sunamganj', 'Bishwambarpur');
INSERT INTO subdistricts VALUES('Sunamganj', 'Chhatak');
INSERT INTO subdistricts VALUES('Sunamganj', 'Jagannathpur');
INSERT INTO subdistricts VALUES('Sunamganj', 'Dowarabazar');
INSERT INTO subdistricts VALUES('Sunamganj', 'Tahirpur');
INSERT INTO subdistricts VALUES('Sunamganj', 'Dharmapasha');
INSERT INTO subdistricts VALUES('Sunamganj', 'Jamalganj');
INSERT INTO subdistricts VALUES('Sunamganj', 'Shalla');
INSERT INTO subdistricts VALUES('Sunamganj', 'Derai');
INSERT INTO subdistricts VALUES('Narsingdi', 'Belabo');
INSERT INTO subdistricts VALUES('Narsingdi', 'Monohardi');
INSERT INTO subdistricts VALUES('Narsingdi', 'Narsingdi-Sadar');
INSERT INTO subdistricts VALUES('Narsingdi', 'Palash');
INSERT INTO subdistricts VALUES('Narsingdi', 'Raipura');
INSERT INTO subdistricts VALUES('Narsingdi', 'Shibpur');
INSERT INTO subdistricts VALUES('Gazipur', 'Kaliganj');
INSERT INTO subdistricts VALUES('Gazipur', 'Kaliakair');
INSERT INTO subdistricts VALUES('Gazipur', 'Kapasia');
INSERT INTO subdistricts VALUES('Gazipur', 'Gazipur-Sadar');
INSERT INTO subdistricts VALUES('Gazipur', 'Sreepur');
INSERT INTO subdistricts VALUES('Shariatpur', 'ShariatpurSadar');
INSERT INTO subdistricts VALUES('Shariatpur', 'Naria');
INSERT INTO subdistricts VALUES('Shariatpur', 'Zajira');
INSERT INTO subdistricts VALUES('Shariatpur', 'Gosairhat');
INSERT INTO subdistricts VALUES('Shariatpur', 'Bhedarganj');
INSERT INTO subdistricts VALUES('Shariatpur', 'Damudya');
INSERT INTO subdistricts VALUES('Narayanganj', 'Araihazar');
INSERT INTO subdistricts VALUES('Narayanganj', 'Bandar');
INSERT INTO subdistricts VALUES('Narayanganj', 'Narayanganj-Sadar');
INSERT INTO subdistricts VALUES('Narayanganj', 'Rupganj');
INSERT INTO subdistricts VALUES('Narayanganj', 'Sonargaon');
INSERT INTO subdistricts VALUES('Tangail', 'Basail');
INSERT INTO subdistricts VALUES('Tangail', 'Bhuapur');
INSERT INTO subdistricts VALUES('Tangail', 'Delduar');
INSERT INTO subdistricts VALUES('Tangail', 'Ghatail');
INSERT INTO subdistricts VALUES('Tangail', 'Gopalpur');
INSERT INTO subdistricts VALUES('Tangail', 'Madhupur');
INSERT INTO subdistricts VALUES('Tangail', 'Mirzapur');
INSERT INTO subdistricts VALUES('Tangail', 'Nagarpur');
INSERT INTO subdistricts VALUES('Tangail', 'Sakhipur');
INSERT INTO subdistricts VALUES('Tangail', 'Tangail-Sadar');
INSERT INTO subdistricts VALUES('Tangail', 'Kalihati');
INSERT INTO subdistricts VALUES('Tangail', 'Dhanbari');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Itna');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Katiadi');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Bhairab');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Tarail');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Hossainpur');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Pakundia');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Kuliarchar');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Kishoreganj-Sadar');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Karimgonj');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Bajitpur');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Austagram');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Mithamoin');
INSERT INTO subdistricts VALUES('Kishoreganj', 'Nikli');
INSERT INTO subdistricts VALUES('Manikganj', 'Harirampur');
INSERT INTO subdistricts VALUES('Manikganj', 'Saturia');
INSERT INTO subdistricts VALUES('Manikganj', 'Manikganj-Sadar');
INSERT INTO subdistricts VALUES('Manikganj', 'Gior');
INSERT INTO subdistricts VALUES('Manikganj', 'Shibaloy');
INSERT INTO subdistricts VALUES('Manikganj', 'Doulatpur');
INSERT INTO subdistricts VALUES('Manikganj', 'Singiar');
INSERT INTO subdistricts VALUES('Dhaka', 'Savar');
INSERT INTO subdistricts VALUES('Dhaka', 'Dhamrai');
INSERT INTO subdistricts VALUES('Dhaka', 'Keraniganj');
INSERT INTO subdistricts VALUES('Dhaka', 'Nawabganj');
INSERT INTO subdistricts VALUES('Dhaka', 'Dohar');
INSERT INTO subdistricts VALUES('Munshiganj', 'Munshiganj-Sadar');
INSERT INTO subdistricts VALUES('Munshiganj', 'Sreenagar');
INSERT INTO subdistricts VALUES('Munshiganj', 'Sirajdikhan');
INSERT INTO subdistricts VALUES('Munshiganj', 'Louhajanj');
INSERT INTO subdistricts VALUES('Munshiganj', 'Gajaria');
INSERT INTO subdistricts VALUES('Munshiganj', 'Tongibari');
INSERT INTO subdistricts VALUES('Rajbari', 'Rajbari-Sadar');
INSERT INTO subdistricts VALUES('Rajbari', 'Goalanda');
INSERT INTO subdistricts VALUES('Rajbari', 'Pangsa');
INSERT INTO subdistricts VALUES('Rajbari', 'Baliakandi');
INSERT INTO subdistricts VALUES('Rajbari', 'Kalukhali');
INSERT INTO subdistricts VALUES('Madaripur', 'Madaripur-Sadar');
INSERT INTO subdistricts VALUES('Madaripur', 'Shibchar');
INSERT INTO subdistricts VALUES('Madaripur', 'Kalkini');
INSERT INTO subdistricts VALUES('Madaripur', 'Rajoir');
INSERT INTO subdistricts VALUES('Gopalganj', 'Gopalganj-Sadar');
INSERT INTO subdistricts VALUES('Gopalganj', 'Kashiani');
INSERT INTO subdistricts VALUES('Gopalganj', 'Tungipara');
INSERT INTO subdistricts VALUES('Gopalganj', 'Kotalipara');
INSERT INTO subdistricts VALUES('Gopalganj', 'Muksudpur');
INSERT INTO subdistricts VALUES('Faridpur', 'Faridpur-Sadar');
INSERT INTO subdistricts VALUES('Faridpur', 'Alfadanga');
INSERT INTO subdistricts VALUES('Faridpur', 'Boalmari');
INSERT INTO subdistricts VALUES('Faridpur', 'Sadarpur');
INSERT INTO subdistricts VALUES('Faridpur', 'Nagarkanda');
INSERT INTO subdistricts VALUES('Faridpur', 'Bhanga');
INSERT INTO subdistricts VALUES('Faridpur', 'Charbhadrasan');
INSERT INTO subdistricts VALUES('Faridpur', 'Madhukhali');
INSERT INTO subdistricts VALUES('Faridpur', 'Saltha');
INSERT INTO subdistricts VALUES('Panchagarh', 'Panchagarh-Sadar');
INSERT INTO subdistricts VALUES('Panchagarh', 'Debiganj');
INSERT INTO subdistricts VALUES('Panchagarh', 'Boda');
INSERT INTO subdistricts VALUES('Panchagarh', 'Atwari');
INSERT INTO subdistricts VALUES('Panchagarh', 'Tetulia');
INSERT INTO subdistricts VALUES('Dinajpur', 'Nawabganj');
INSERT INTO subdistricts VALUES('Dinajpur', 'Birganj');
INSERT INTO subdistricts VALUES('Dinajpur', 'Ghoraghat');
INSERT INTO subdistricts VALUES('Dinajpur', 'Birampur');
INSERT INTO subdistricts VALUES('Dinajpur', 'Parbatipur');
INSERT INTO subdistricts VALUES('Dinajpur', 'Bochaganj');
INSERT INTO subdistricts VALUES('Dinajpur', 'Kaharol');
INSERT INTO subdistricts VALUES('Dinajpur', 'Fulbari');
INSERT INTO subdistricts VALUES('Dinajpur', 'Dinajpur-Sadar');
INSERT INTO subdistricts VALUES('Dinajpur', 'Hakimpur');
INSERT INTO subdistricts VALUES('Dinajpur', 'Khansama');
INSERT INTO subdistricts VALUES('Dinajpur', 'Birol');
INSERT INTO subdistricts VALUES('Dinajpur', 'Chirirbandar');
INSERT INTO subdistricts VALUES('Lalmonirhat', 'Lalmonirhat-Sadar');
INSERT INTO subdistricts VALUES('Lalmonirhat', 'Kaliganj');
INSERT INTO subdistricts VALUES('Lalmonirhat', 'Hatibandha');
INSERT INTO subdistricts VALUES('Lalmonirhat', 'Patgram');
INSERT INTO subdistricts VALUES('Lalmonirhat', 'Aditmari');
INSERT INTO subdistricts VALUES('Nilphamari', 'Syedpur');
INSERT INTO subdistricts VALUES('Nilphamari', 'Domar');
INSERT INTO subdistricts VALUES('Nilphamari', 'Dimla');
INSERT INTO subdistricts VALUES('Nilphamari', 'Jaldhaka');
INSERT INTO subdistricts VALUES('Nilphamari', 'Kishorganj');
INSERT INTO subdistricts VALUES('Nilphamari', 'Nilphamari-Sadar');
INSERT INTO subdistricts VALUES('Gaibandha', 'Sadullapur');
INSERT INTO subdistricts VALUES('Gaibandha', 'Gaibandha-Sadar');
INSERT INTO subdistricts VALUES('Gaibandha', 'Palashbari');
INSERT INTO subdistricts VALUES('Gaibandha', 'Saghata');
INSERT INTO subdistricts VALUES('Gaibandha', 'Gobindaganj');
INSERT INTO subdistricts VALUES('Gaibandha', 'Sundarganj');
INSERT INTO subdistricts VALUES('Gaibandha', 'Phulchari');
INSERT INTO subdistricts VALUES('Thakurgaon', 'Thakurgaon-Sadar');
INSERT INTO subdistricts VALUES('Thakurgaon', 'Pirganj');
INSERT INTO subdistricts VALUES('Thakurgaon', 'Ranisankail');
INSERT INTO subdistricts VALUES('Thakurgaon', 'Haripur');
INSERT INTO subdistricts VALUES('Thakurgaon', 'Baliadangi');
INSERT INTO subdistricts VALUES('Rangpur', 'Rangpur-Sadar');
INSERT INTO subdistricts VALUES('Rangpur', 'Gangachara');
INSERT INTO subdistricts VALUES('Rangpur', 'Taragonj');
INSERT INTO subdistricts VALUES('Rangpur', 'Badargonj');
INSERT INTO subdistricts VALUES('Rangpur', 'Mithapukur');
INSERT INTO subdistricts VALUES('Rangpur', 'Pirgonj');
INSERT INTO subdistricts VALUES('Rangpur', 'Kaunia');
INSERT INTO subdistricts VALUES('Rangpur', 'Pirgacha');
INSERT INTO subdistricts VALUES('Kurigram', 'Kurigram-Sadar');
INSERT INTO subdistricts VALUES('Kurigram', 'Nageshwari');
INSERT INTO subdistricts VALUES('Kurigram', 'Bhurungamari');
INSERT INTO subdistricts VALUES('Kurigram', 'Phulbari');
INSERT INTO subdistricts VALUES('Kurigram', 'Rajarhat');
INSERT INTO subdistricts VALUES('Kurigram', 'Ulipur');
INSERT INTO subdistricts VALUES('Kurigram', 'Chilmari');
INSERT INTO subdistricts VALUES('Kurigram', 'Rowmari');
INSERT INTO subdistricts VALUES('Kurigram', 'Charrajibpur');
INSERT INTO subdistricts VALUES('Sherpur', 'Sherpur-Sadar');
INSERT INTO subdistricts VALUES('Sherpur', 'Nalitabari');
INSERT INTO subdistricts VALUES('Sherpur', 'Sreebordi');
INSERT INTO subdistricts VALUES('Sherpur', 'Nokla');
INSERT INTO subdistricts VALUES('Sherpur', 'Jhenaigati');
INSERT INTO subdistricts VALUES('Mymensingh', 'Fulbaria');
INSERT INTO subdistricts VALUES('Mymensingh', 'Trishal');
INSERT INTO subdistricts VALUES('Mymensingh', 'Bhaluka');
INSERT INTO subdistricts VALUES('Mymensingh', 'Muktagacha');
INSERT INTO subdistricts VALUES('Mymensingh', 'Mymensingh-Sadar');
INSERT INTO subdistricts VALUES('Mymensingh', 'Dhobaura');
INSERT INTO subdistricts VALUES('Mymensingh', 'Phulpur');
INSERT INTO subdistricts VALUES('Mymensingh', 'Haluaghat');
INSERT INTO subdistricts VALUES('Mymensingh', 'Gouripur');
INSERT INTO subdistricts VALUES('Mymensingh', 'Gafargaon');
INSERT INTO subdistricts VALUES('Mymensingh', 'Iswarganj');
INSERT INTO subdistricts VALUES('Mymensingh', 'Nandail');
INSERT INTO subdistricts VALUES('Mymensingh', 'Tarakanda');
INSERT INTO subdistricts VALUES('Jamalpur', 'Jamalpur-Sadar');
INSERT INTO subdistricts VALUES('Jamalpur', 'Melandah');
INSERT INTO subdistricts VALUES('Jamalpur', 'Islampur');
INSERT INTO subdistricts VALUES('Jamalpur', 'Dewangonj');
INSERT INTO subdistricts VALUES('Jamalpur', 'Sarishabari');
INSERT INTO subdistricts VALUES('Jamalpur', 'Madarganj');
INSERT INTO subdistricts VALUES('Jamalpur', 'Bokshiganj');
INSERT INTO subdistricts VALUES('Netrokona', 'Barhatta');
INSERT INTO subdistricts VALUES('Netrokona', 'Durgapur');
INSERT INTO subdistricts VALUES('Netrokona', 'Kendua');
INSERT INTO subdistricts VALUES('Netrokona', 'Atpara');
INSERT INTO subdistricts VALUES('Netrokona', 'Madan');
INSERT INTO subdistricts VALUES('Netrokona', 'Khaliajuri');
INSERT INTO subdistricts VALUES('Netrokona', 'Kalmakanda');
INSERT INTO subdistricts VALUES('Netrokona', 'Mohongonj');
INSERT INTO subdistricts VALUES('Netrokona', 'Purbadhala');
INSERT INTO subdistricts VALUES('Netrokona', 'Netrokona-Sadar');


Kishoreganj -> 24.43226398577787, 90.78712340786859
mymensing -> 24.783996163993073, 90.35443944351312
current -> 23.948469589601494, 90.3806994423299




insert into `products` values (1694361035535, 1694360670575, 'Wallpaper', 'Laptop skin for backside decoration.', 150, 1, 1, 'DIY-Arts-and-Crufts', 24.43226398577787, 90.78712340786859);
INSERT INTO products 
VALUES (1694367655270, 1694360670575, 'Smartphone', 'High-performance smartphone with a brilliant display', 49990, 1, 1, 'Electronics-and-Appliances', 24.43226398577787, 90.78712340786859);
INSERT INTO products 
VALUES (1694367747267, 1694360670575, 'Laptop', 'Powerful laptop with a sleek design', 89900, 1, 1, 'Electronics-and-Appliances', 24.43226398577787, 90.78712340786859);
INSERT INTO products 
VALUES (1694368270476, 1694360670575, 'LED TV', '55-inch LED TV with stunning picture quality', 59900, 1, 1, 'Electronics-and-Appliances', 23.89327329392935, 90.40093006379995);
INSERT INTO products 
VALUES (1694368338755, 1694360670575, 'Power Drill', 'Professional-grade power drill for DIY projects', 400, 1, 1, 'DIY-Arts-and-Crufts', 23.89327329392935, 90.40093006379995);
INSERT INTO products 
VALUES (1694368413330, 1694360670575, 'Tablet', '10-inch tablet with a responsive touchscreen', 249990, 1, 1, 'Electronics-and-Appliances', 23.89327329392935, 90.40093006379995);
INSERT INTO products 
VALUES (1694368471852, 1694360670575, 'Jeans', 'Classic blue jeans for a stylish look', 4900, 1, 1, 'Clothing-and-Accessories', 23.89327329392935, 90.40093006379995);
INSERT INTO products 
VALUES (1694368553392, 1694360670575, 'Spaghetti', 'Premium Italian spaghetti for delicious meals', 400, 1, 1, 'Groceries', 23.89327329392935, 90.40093006379995);
INSERT INTO products 
VALUES (1694368618920, 1694360670575, 'Face Cream', 'Moisturizing face cream for radiant skin', 2400, 1, 1, 'Health-and-Beauty', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694368703465, 1694360670575, 'Oil Paint Set', 'Complete oil paint set for artists', 599, 1, 1, 'DIY-Arts-and-Crafts', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694368767381, 1694360670575, 'Board Game', 'Fun board game for family entertainment', 2500, 1, 1, 'Toys-and-Games', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694368821341, 1694360670575, 'Mountain Bike', 'All-terrain mountain bike for outdoor adventures', 9000, 1, 1, 'Vehicles-and-Transportations', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694368903751, 1694360670575, 'Granola Bars', 'Healthy granola bars for on-the-go snacking', 500, 1, 1, 'Groceries', 24.783996163993073, 90.35443944351312);
INSERT INTO products 
VALUES (1694368990170, 1694360670575, 'Board Game Collection', 'Collection of classic board games for family fun', 1000, 1, 1, 'Toys-and-Games', 24.783996163993073, 90.35443944351312);
INSERT INTO products 
VALUES (1694369027540, 1694360670575, 'Quinoa', 'Nutrient-rich quinoa for healthy meals', 700, 1, 1, 'Groceries', 24.783996163993073, 90.35443944351312);
INSERT INTO products 
VALUES (1694369081896, 1694360670575, 'Oil Pastel Set', 'Complete oil pastel set for artists', 600, 1, 1, 'DIY-Arts-and-Crafts', 24.783996163993073, 90.35443944351312);


INSERT INTO products 
VALUES (1694369549941, 1694360670575, 'T-shirt', 'Comfortable cotton t-shirt for everyday wear', 400, 2, 1, 'Clothing-and-Accessories', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370160082, 1694360670575, 'Road Bike', 'High-performance road bike for cycling enthusiasts', 10000, 1, 1, 'Vehicles-and-Transportations', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370255448, 1694360670575, 'Chess Set', 'Classic chess set for strategic gameplay', 2000, 1, 1, 'Toys-and-Games', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370324499, 1694360670575, 'Watercolor Paint Set', 'Complete watercolor paint set for artists', 1500, 1, 1, 'DIY-Arts-and-Crafts', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370375778, 1694360670575, 'Screwdriver Set', 'Multi-functional screwdriver set for DIY projects', 2050, 1, 1, 'DIY-Arts-and-Crafts', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370474537, 1694360670575, 'Coffee Table', 'Modern coffee table for your living room', 10500, 1, 1, 'Furniture-and-Home-Decor', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370520489, 1694360670575, 'Hoodie', 'Cozy hoodie for chilly days', 3000, 1, 1, 'Clothing-and-Accessories', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370609797, 1694360670575, 'Camping Gear Bundle', 'Complete camping gear bundle for outdoor adventures', 30000, 2, 1, 'DIY-Arts-and-Crafts', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370687240, 1694360670575, 'Mountain Climbing Gear', 'Essential gear for mountain climbers', 35000, 1, 1, 'Vehicles-and-Transportations', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370746090, 1694360670575, 'Shampoo and Conditioner Set', 'Premium hair care set for silky-smooth hair', 800, 1, 1, 'Health-and-Beauty-Products', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370802367, 1694360670575, 'Face Mask Set', 'Set of face masks for skin rejuvenation', 500, 1, 1, 'Health-and-Beauty-Products', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370856123, 1694360670575, 'Wireless Headphones', 'High-quality wireless headphones for immersive audio', 6000, 1, 1, 'Electronics-and-Appliances', 24.4333792, 90.7708319);
INSERT INTO products 
VALUES (1694370901448, 1694360670575, 'Rice', 'High-quality rice for your daily meals', 1000, 1, 1, 'Groceries', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694370952684, 1694360670575, 'Board Game', 'Fun board game for family entertainment', 500, 1, 1, 'Toys-and-Games', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694370996586, 1694360670575, 'Dress', 'Elegant evening dress for special occasions', 4000, 1, 1, 'Clothing-and-Accessories', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694371059001, 1694360670575, 'Sneakers', 'Stylish sneakers for casual wear', 1500, 1, 1, 'Clothing-and-Accessories', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694371104714, 1694360670575, 'Sketchbook', 'Blank sketchbook for artists and doodlers', 580, 1, 1, 'DIY-Arts-and-Crafts', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694371161050, 1694360670575, 'Kayak', 'Inflatable kayak for water adventures', 10000, 1, 1, 'Vehicles-and-Transportations', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694371219655, 1694360670575, 'Playing Cards', 'Standard deck of playing cards for card games', 50, 1, 1, 'Toys-and-Games', 23.94652814539342, 90.37913303241238);
INSERT INTO products 
VALUES (1694371282865, 1694360670575, 'Power Drill', 'Professional-grade power drill for DIY projects', 4500, 1, 1, 'DIY-Arts-and-Crafts', 23.92754841734143, 90.37587015433962);
INSERT INTO products 
VALUES (1694371403037, 1694360670575, 'Realme 5 Pro Smartphone', 'Realme 5 pro, Dual Camera, 4500mAh battery, 2 months old', 88000, 2, 1, 'Electronics-and-Appliances', 23.92754841734143, 90.37587015433962);
INSERT INTO products 
VALUES (1694371546015, 1694360670575, 'Bookshelf', 'Sturdy bookshelf for organizing your library', 15000, 1, 1, 'Furniture-and-Home-Decor', 23.92754841734143, 90.37587015433962);
INSERT INTO products 
VALUES (1694371603728, 1694360670575, 'Sofa', 'Stylish and comfortable sofa for your living room', 20000, 1, 1, 'Furniture-and-Home-Decor', 23.92754841734143, 90.37587015433962);



insert into tags values(1694361035535, 'wall');
INSERT INTO tags 
VALUES 
(1694361035535, 'nice'),
(1694361035535, 'good'),
(1694361035535, 'photo'),
(1694361035535, 'paper'),
(1694361035535, 'design'),
(1694361035535, 'skin'),
(1694361035535, 'free'),
(1694367546799, 'Clothing'),
(1694367546799, 'Cotton'),
(1694367546799, 'T-shirt'),
(1694367655270, 'Electronics'),
(1694367655270, 'Mobile'),
(1694367655270, 'Smartphone'),
(1694367655270, 'High-performance'),
(1694367747267, 'Electronics'),
(1694367747267, 'Laptop'),
(1694367747267, 'High-performance');

INSERT INTO tags 
VALUES
(1694368270476, 'Electronics'),
(1694368270476, 'TV'),
(1694368270476, 'Entertainment'),
(1694368338755, 'Tools'),
(1694368338755, 'Power Drill'),
(1694368338755, 'DIY'),
(1694368413330, 'Electronics'),
(1694368413330, 'Tablet'),
(1694368413330, 'Entertainment'),
(1694368471852, 'Clothing'),
(1694368471852, 'Jeans'),
(1694368471852, 'Fashion'),
(1694368553392, 'Food'),
(1694368553392, 'Italian'),
(1694368553392, 'Pasta'),
(1694368618920, 'Beauty'),
(1694368618920, 'Skin Care'),
(1694368618920, 'Face Cream'),
(1694368703465, 'Arts and Crafts'),
(1694368703465, 'Painting'),
(1694368703465, 'Art Supplies'),
(1694368767381, 'Games'),
(1694368767381, 'Board Game'),
(1694368767381, 'Family'),
(1694368821341, 'Bicycles'),
(1694368821341, 'Outdoor'),
(1694368821341, 'Sports'),
(1694368903751, 'Food'),
(1694368903751, 'Snacks'),
(1694368903751, 'Healthy'),
(1694368990170, 'Games'),
(1694368990170, 'Board Games'),
(1694368990170, 'Family'),
(1694369027540, 'Food'),
(1694369027540, 'Grain'),
(1694369027540, 'Healthy'),
(1694369549941, 'Clothing'),
(1694369549941, 'T-shirt'),
(1694369549941, 'Cotton'),
(1694370160082, 'Bicycles'),
(1694370160082, 'Sports'),
(1694370160082, 'Cycling'),
(1694370255448, 'Games'),
(1694370255448, 'Chess'),
(1694370255448, 'Strategy'),
(1694370324499, 'Arts and Crafts'),
(1694370324499, 'Painting'),
(1694370324499, 'Art Supplies'),
(1694370324499, 'Watercolor'),
(1694370375778, 'Tools'),
(1694370375778, 'Screwdriver'),
(1694370375778, 'DIY'),
(1694370474537, 'Furniture'),
(1694370474537, 'Coffee Table'),
(1694370474537, 'Living Room'),
(1694370520489, 'Clothing'),
(1694370520489, 'Hoodie'),
(1694370520489, 'Fashion'),
(1694370609797, 'Outdoor'),
(1694370609797, 'Sports'),
(1694370609797, 'Camping'),
(1694370687240, 'Outdoor'),
(1694370687240, 'Sports'),
(1694370687240, 'Climbing'),
(1694370746090, 'Beauty'),
(1694370746090, 'Hair Care'),
(1694370746090, 'Shampoo'),
(1694370746090, 'Conditioner'),
(1694370856123, 'Electronics'),
(1694370856123, 'Headphones'),
(1694370856123, 'Audio'),
(1694370901448, 'Food'),
(1694370901448, 'Rice'),
(1694370901448, 'Staple'),
(1694370952684, 'Games'),
(1694370952684, 'Board Game'),
(1694370952684, 'Family'),
(1694370996586, 'Clothing'),
(1694370996586, 'Dress'),
(1694370996586, 'Fashion'),
(1694371059001, 'Clothing'),
(1694371059001, 'Shoes'),
(1694371059001, 'Fashion'),
(1694371161050, 'Outdoor'),
(1694371161050, 'Sports'),
(1694371161050, 'Water Sports'),
(1694371219655, 'Games'),
(1694371219655, 'Cards'),
(1694371219655, 'Card Games'),
(1694371282865, 'Tools'),
(1694371282865, 'Power Drill'),
(1694371282865, 'DIY'),
(1694371403037, 'Electronics'),
(1694371403037, 'Mobile'),
(1694371403037, 'Smartphone'),
(1694371403037, 'High-performanceElec'),
(1694371403037, 'High-performance'),
(1694371546015, 'Furniture'),
(1694371546015, 'Bookshelf'),
(1694371546015, 'Home Organization'),
(1694371603728, 'Furniture'),
(1694371603728, 'Sofa'),
(1694371603728, 'Living Room');



