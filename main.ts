import * as BairagiTaans from "./bairagitaans.js";

import {DEFAULT_NOTE_LEN, setLanguage, Sound} from "./music.js";
import {parse} from "./parser.js";
import {display, displayHeader} from "./renderer.js";

$(function() {

    function renderSong() {
        let raag = $('select#raag').val();
        switch (raag) {

            case 'GujriTodi':
                var scr = `
H:Gujri Todi
B:16
S:9
ddmd_mgm+SNd_mgrS
grdm+g+r{+S+r}{+g+r}{+SN}{dN}{+S+r}{+g+r}{SN}{dm}{gr}S
{N+S}{dN}{md}{gm}{rg}{Sr}{gm}{dN}+S_Ndmd+S_
{md}{+g+r}{SN}{md}{+r+S}{Nd}{md}+S_N_d_m_g`;
                parseAndDisplayText(scr);
                break;

            case 'Bairagi':
                var scr = `
H: Bairagi Bhairav
B: 16
S: 14
{rS}{-nS}{rP}M__PMrrMSr-NS_
-P-n-P-nS_rSSrSrM_PMPnPn+S_+R_{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}
{rS}{-nS}{rP}M__PMrrS_  
{+S+r}{+Sn}{Pn}M{PP}nP+S__+r+S+rn+S_
+S+r+P+M+r+SSrPMrS_rMrMPMPnPn+Sn+S+R{+S+r}{Sn}{Pn}{PM}{rM}{Pn}{PM}{rS}_
    `;
                parseAndDisplayText(scr);
                BairagiTaans.render();
                break;

            case 'Bhairav':
                // line 2 and 3 are repeated twice below, could use a var
                var scr = `
H:Bhairav
B:16
S:9
GMd_P_dMP_{MP}{dP}M_Gr
GGMrGMPPMGMGr_S_
SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG
M_MMPPddPd+S_+SN+r+S
d_dN_N+S+SN_+S+r{+S+r}{+SN}dP}
GGMrGMPPMGMGr_S_
SrGMP_Pd{Pd}{N+S}{dN}{+SN}dPMG`;
                parseAndDisplayText(scr);
                break;
                
            case 'Bhoop':
                var scr = `
H:Bhoop (teentaal)
B:16
S:9
D+SDPGRSRG_GRGPD_
GGGRGPD_+S_DPGRS_
G_G_P_D_+S_+S_+S+R+S_
+G+R+SD+R+SDP+S_DPGRS_
H:Bhoop (ektaal)
B:12
S:1
GRG_R_S-D-P-DSR
GRG_{GP}{DP}GRSDS_
-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}
-D{-DS}-DSR{GR}SR{GP}{DP}{DP}{DP}
GGGPDPD+SD+S_+S
DDD+S+R+R{+S+R}+G+R{+S+R}{+SD}P
D{D+S}DPG{GP}GRS{SR}{S-D}{SR}`;

                parseAndDisplayText(scr);
                break;

            case 'Durga':
                var scr = `
H:Durga gat number 1 (teentaal)
B:16
S:9
SRRPPMPDD_MPMRS_
SRSRS-DS_D+SDPMRS_
MMPD+SD+S_D+S+R+SDPM_
+M_+R+SDPMPDSDPMRS_
H:Durga gat number 2 (teentaal)
SDPD_M_PD_MPMRS_
SRMPRMPD+S{DP}D{PM}P{MR}M{RS}
MMPD+SD+S_D+S+R+S{D+S}{DP}M_
+M+R+SD+R+S+DP+S{DP}D{PM}P{MP}M{RS}`;
                parseAndDisplayText(scr);
                break;
                
            case 'Bageshree':
                var scr = `
H:Bageshree gat number 1 (teentaal)
B:16
S:9
MgRS-nS-D-nS_M_gRS_
-nSgMDnD_MPDMgRS_
gMDnS_S_Dn+S+M+g+R+S_
+M+g+R+SDnDMMPDMgRS_`;

                parseAndDisplayText(scr);
                break;

            case 'Multani':  var scr = `
H:Multani (ektaal)
B:12
S:9
mgmP{mP}{dP}mgrS_S
-N_Sg_mP_{Sg}{mP}{mg}{rS}
PmPgmmPNN+S_+S
PN+S+g+r+SN+SNdPm
gmPN+SN{PN}{+SN}{dP}{mg}{rS}{-nS}
gmPN+SN{PN}{+SN}{dP}{mg}{rS}{-nS}{PN}{+SN}{dP}{mg}{rS}{-nS}{PN}{+SN}{dP}{mg}{rS}{-nS}`;
                parseAndDisplayText(scr);
                break;

            case 'Malhar': var scr = `
H:Malhar (mattataal)
B:9
S:7
{-n-M}{-P-n}{-D-N}S{RR}P{gM}R{-nS}
{MR}{PM}{Pn}D{DN+S_}{nP}{nPMP}{gM}{RS}
{MP}{MP}{DN}+S_{DN+S+R}{N+S}{Dn}{MP}
{+S+M+g+M}{+R+S}{DN}P{MPDN}+S{NP}{gM}{RS}
`;
                parseAndDisplayText(scr);
                break;
        }
    }

    $('#lang, #raag').change(function(e) {
        const lang = $('#lang').val() as string;
        $('.taans').html('');

        setLanguage(lang);
        $('link[href="hi.css"], link[href="ka.css"], link[href="en.css"]').prop('disabled', true);
        $('link[href="' + lang + '.css"]').prop('disabled', false);
        $('body').removeClass('hi').removeClass('kn').removeClass('en').removeClass('sen');
        $('body').addClass(lang);

        renderSong();
    });

    renderSong();
});


export function parseAndDisplayText (s: string) {
    let lines = s.split ("\n");
    var cycle = 16;
    var start_beat = 9;
    lines.forEach(function(line) {
        line = line.trim();
        if (!line)
            return;
        if (line.toUpperCase().indexOf("H:") == 0) {
            displayHeader (line.substring(2).trim());
        } else if (line.toUpperCase().indexOf("B:") == 0) {
            cycle = parseInt(line.substring(2).trim());
        } else if (line.toUpperCase().indexOf("S:") == 0) {
            start_beat = parseInt(line.substring(2).trim());
        } else {
            display (parse(line, DEFAULT_NOTE_LEN), start_beat, cycle);
        }
    });
}
