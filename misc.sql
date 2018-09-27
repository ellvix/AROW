
// rmd table
CREATE TABLE `rmd` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) DEFAULT NULL,
 `text` text,
 `formats` varchar(255) DEFAULT NULL,
 `ip_address` varchar(255) DEFAULT NULL,
 `user` varchar(255) DEFAULT NULL,
 `updated_on` datetime DEFAULT CURRENT_TIMESTAMP,
 `is_archived` tinyint(1) DEFAULT NULL,
 `notes` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8


// StoreNewRMD proc
// IN name varchar(255)
// IN text TEXT
// IN formats varchar(255)
// IN ip_address varchar(255)
// OUT id int
BEGIN
    DECLARE id int DEFAULT 1;
    DECLARE num int DEFAULT 0;
    set num = (SELECT count(*) FROM `rmd` WHERE `ip_address` = ip_address);

    if ( num > 0 ) THEN
        set id = (SELECT `id` FROM `rmd` WHERE `ip_address` = ip_address);
        UPDATE `rmd` SET `name`=name, `text`=text, `formats`=formats, `ip_address`=ip_address, `updated_on`=NOW() WHERE `ip_address` = ip_address;
    ELSE
        INSERT INTO `rmd` (`name`, `formats`, `text`, `ip_address`, `updated_on`) VALUES (name, formats, text, ip_address, NOW());
        SELECT LAST_INSERT_ID() INTO id;
    END IF;

    SELECT id;
    END

// StoreNewIPOnly proc
// IN ip_address varchar(255)
// OUT id int
BEGIN
    DECLARE id int DEFAULT 1;
    DECLARE num int DEFAULT 0;
    set num = (SELECT count(*) FROM `rmd` WHERE `ip_address` = ip_address);

    if ( num > 0 ) THEN
        set id = (SELECT `id` FROM `rmd` WHERE `ip_address` = ip_address);
        UPDATE `rmd` SET `updated_on`=NOW() WHERE `ip_address` = ip_address;
    ELSE
        INSERT INTO `rmd` (`ip_address`, `updated_on`) VALUES (ip_address, NOW());
        SELECT LAST_INSERT_ID() INTO id;
    END IF;

    SELECT id;
    END

